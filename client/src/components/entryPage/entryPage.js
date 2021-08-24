import React from "react";
import './entryPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactNotification from 'react-notifications-component';
import {useHistory} from "react-router-dom";

import {store}  from 'react-notifications-component';


class EntryPageClass extends React.Component{

    componentDidMount(){
        sessionStorage.removeItem('user');
    }

    ToggleAutBox = (event) => {
        this.cleanInputs();

        if(event.target.innerHTML === "Sing in"){
            this.toLoginForm();
            this.removeValidClass();
            this.cleanTooltips();
        }
        else if(event.target.innerHTML === "Sing up"){
            this.toSignUpForm();
        }
    };

    onBlur = (event) => {
        this.checkInputs(event);
    };

    checkInputs = (event) => {
        const form = event.target.parentElement.parentElement.parentElement;
        const username = form.querySelector("input[type=text]");
        const passwords = form.querySelectorAll("input[type=password]");
        const usernameValue = username.value.trim();
        const passwordValue = passwords.item(0).value.trim();
        const repeatPasswordValue = passwords.item(1).value.trim();

        if(event.target === username){
            if( usernameValue === "" || !this.isValidUsername(usernameValue)){
                this.setErrorFor(username, "Username must be 8-20 characters long and contain only letters and numbers");
            }
            else {
                this.setSuccessFor(username)
            }
        }

        if(event.target === passwords.item(0)){
            if(repeatPasswordValue !== ""){
                this.checkRepeatPassword(passwords);
            }

            if(passwordValue === "" || !this.isValidPassword(passwordValue)){
                this.setErrorFor(passwords.item(0), "Password must be 8-20 characters long " +
                    "and contain at least one letter and one number");
            }
            else {
                this.setSuccessFor(passwords.item(0))
            }
        }

        if(repeatPasswordValue !== "" && event.target === passwords.item(1) ){
            this.checkRepeatPassword(passwords);
        }


    };

    isValidUsername = (username) =>{
        return new RegExp("^(?=.{8,20}$)[a-zA-Z0-9]+$").test(username);
    };

    isValidPassword = (password) =>{
        return new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!/%*#?&]{8,20}$").test(password);
    };

    checkRepeatPassword = (passwords) => {
        const passwordValue = passwords.item(0).value.trim();
        const repeatPasswordValue = passwords.item(1).value.trim();

        if(repeatPasswordValue !== passwordValue){
            this.setErrorFor(passwords.item(1), "Password confirmation doesn't match Password");
        }
        else {
            this.setSuccessFor(passwords.item(1))
        }
    };

    setErrorFor = (input, message) => {
        const inputBox = input.parentElement;
        const tooltip = inputBox.querySelector(".tooltip");

        if(!this.isThereVisibleTooltip()){
            if(message){
                tooltip.innerHTML = message;
            }

            tooltip.style.cssText = "visibility: visible";

            setTimeout(() => {
                tooltip.style.cssText = "visibility: hidden";
            },3000);
        }

        inputBox.classList.remove("valid");
        inputBox.classList.add("invalid");
    };

    setSuccessFor = (input) => {
        const inputBox = input.parentElement;
        const tooltip = inputBox.querySelector(".tooltip");

        tooltip.style.cssText = "visibility: hidden";

        inputBox.classList.remove("invalid");
        inputBox.classList.add("valid");
    };

    cleanTooltips = () => {
        const allTooltips = document.querySelectorAll(".tooltip");

        for(let i = 0; i < 5; i++){
            allTooltips.item(i).style.cssText = "visibility: hidden";
        }
    };

    onSubmitSignUp = async (event) => {
        event.preventDefault();

        const form = event.target.parentElement.parentElement;

        if(this.isEmptyForm(form)){
            const input = this.getEmptyInput(form);
            this.setErrorFor(input, "This field must be filled");
            return;
        }

        if(!this.isValidForm(form)){
            const input = form.querySelector(".invalid input");
            this.setErrorFor(input);
            return;
        }

        const username = form.querySelector("input[type=text]").value;
        const password = form.querySelector("input[type=password]").value;

        console.log(JSON.stringify({username, password}));

        const data = {username, password};

        try {
            const response = await fetch("/registration", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await response;
            const json = await response.json();
            console.log('Успех:', JSON.stringify(json));

            if(res.status === 200){
                this.toLoginForm();
                this.cleanInputs();
                this.removeValidClass();
                this.successNotification();
            }

            if(res.status === 409){
                const input = form.querySelector("input");
                this.setErrorFor(input, JSON.parse(JSON.stringify(json)).message);
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    isValidForm = (form) => {
        const username = form.querySelector(".username-box");
        const passwords = form.querySelectorAll(".password-box");

        return username.classList.contains("valid") && passwords.item(0).classList.contains("valid") &&
            !passwords.item(1).classList.contains("invalid");
    };

    isEmptyForm = (form) => {
        const username = form.querySelector("input[type=text]");
        const passwords = form.querySelectorAll("input[type=password]");

        return username.value === "" || passwords.item(0).value === "" || passwords.item(1).value === "";
    };

    isThereVisibleTooltip = () => {
        const allTooltips = document.querySelectorAll(".tooltip");

        for(let i = 0; i < 5; i++){
            if(allTooltips.item(i).style.visibility === "visible"){
                return true;
            }
        }

        return false;
    };

    getEmptyInput = (form) => {
        const username = form.querySelector("input[type=text]");
        const passwords = form.querySelectorAll("input[type=password]");

        if(username.value === "") return username;
        if(passwords.item(0).value === "") return passwords.item(0);
        if(passwords.item(1).value === "") return passwords.item(1);
    };

    successNotification = () => {
        store.addNotification({
            title: "Success",
            message: "Registration completed successfully",
            type: "success",
            insert: "top",
            container: "top-left",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    };

    cleanInputs = () => {
        const curPage = document.querySelector(".entry-page");
        const inputs = curPage.querySelectorAll("input[type=text], input[type=password]");

        for(let i = 0; i < 5; i++){
            inputs.item(i).value = "";
        }
    };

    toLoginForm = () => {
        const loginForm = document.querySelector("form.login");
        const signUpForm = document.querySelector("form.sign-up");

        signUpForm.style.cssText = "display: none";
        loginForm.style.cssText = "display: block";
    };

    toSignUpForm = () => {
        const loginForm = document.querySelector("form.login");
        const signUpForm = document.querySelector("form.sign-up");

        loginForm.style.cssText = "display: none";
        signUpForm.style.cssText = "display: block";
    };

    removeValidClass = () => {
        const inputs = document.querySelectorAll(".username-box, .password-box");

        for(let i = 0; i < 5; i++){
            inputs.item(i).classList.remove("valid");
            inputs.item(i).classList.remove("invalid");
        }
    };


    onSubmitLogin = async (event) => {
        event.preventDefault();

        const form = event.target.parentElement.parentElement;
        const username = form.querySelector("input[type=text]").value;
        const password = form.querySelector("input[type=password]").value;

        const data = {username, password};

        try {
            const response = await fetch("/auth", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await response;
            const json = await response.json();
            console.log('Успех:', JSON.stringify(json));

            if(res.status === 200){
                console.log("Logged in successfully");
                sessionStorage.setItem('user', username);
            }

            if(res.status === 401){
                this.errorNotification();
            }

            return res.status;
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    errorNotification = () => {
        store.addNotification({
            title: "Error",
            message: "Incorrect username or password",
            type: "danger",
            insert: "top",
            container: "top-left",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    };



    render() {

        return(
            <div className = "entry-page">
                <form className = "login">
                    <div className = "authorization-block">
                        <InputUsername
                            placeholder = "Username"
                            onBlur = {() => {}}
                        />
                        <InputPassword
                            placeholder = "Password"
                            onBlur = {() => {}}/>
                        <Submit
                            value = "Sign in"
                            onSubmitFunc = {this.onSubmitLogin}
                        />
                    </div>

                    <p className = "sign-up-block">
                        <span>Don't have an account?</span>
                        <span
                            className = "sing-up-btn"
                            onClick = {event => this.ToggleAutBox(event)}
                        >Sing up</span>
                    </p>
                </form>

                <form className = "sign-up">
                  <div className = "authorization-block">
                      <InputUsername
                          placeholder = "Choose username"
                          onBlur = {this.onBlur}/>
                      <InputPassword
                          placeholder = "Enter password"
                          onBlur = {this.onBlur}/>
                      <InputPassword
                          placeholder = "Repeat password"
                          onBlur = {this.onBlur}/>
                      <Submit
                          value = "Sign up"
                          onSubmitFunc = {this.onSubmitSignUp}
                      />
                  </div>
                    <p className = "sign-in-block">
                        <span>Already have an account?</span>
                        <span
                            className = "sing-up-btn"
                            onClick = {event => this.ToggleAutBox(event)}
                            >
                            Sing in</span>
                    </p>
              </form>
            </div>
        );
    }
}


function InputUsername(props) {
    const {placeholder, onBlur} = props;

    return (
        <>
            <div className = "username-box">
                <span className = "icon">
                    <FontAwesomeIcon icon={['fas', 'user']} />
                </span>
                <input type = "text"
                       placeholder = {placeholder}
                       onBlur = {event => onBlur(event)}
                />
                <span className="tooltip">Tooltip text</span>
            </div>
        </>
    );
}

function InputPassword(props) {
    const {placeholder, onBlur} = props;

    return (
        <>
            <div className = "password-box">
                <span className = "icon">
                    <FontAwesomeIcon icon={['fas', 'lock']} />
                </span>
                <input type = "password"
                       placeholder = {placeholder}
                       onBlur = {event => onBlur(event)}/>
                <span className="tooltip">Tooltip text</span>
            </div>
        </>
    );
}

function Submit(props) {
    const {value, onSubmitFunc} = props;
    const history = useHistory();

    const onClickHandler = (event) => {
        const loginStatus = onSubmitFunc(event);
        loginStatus.then(status => {
            if(status === 200) {
                history.push('/home');
            }
        });


    };

    return(
        <input
            className = "submit"
            type = "submit"
            value = {value}
            onClick = {event => {onClickHandler(event)}}
        />
    );
}


export default  () => {
    return(
        <>
            <ReactNotification/>
            <EntryPageClass/>
        </>
    );
};


