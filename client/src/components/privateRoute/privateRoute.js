import React from "react";
import {Route, Redirect, useLocation} from "react-router-dom";



export default ({children, ...rest}) => {
    return(
        <Route {...rest} render = {() => {
            return sessionStorage.getItem('user')?
                children
                : <Redirect {...rest} to = "/"/>
        }}/>
    );

}
