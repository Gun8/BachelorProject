const con = require('../mysql');
const isEmpty = require("is-empty");

const registration = (req,res) => {
    const {username, password} = req.body;

    const sql = `
    SELECT
      *
    FROM
      users
    WHERE name = '${username}'
  ;`;

    con.query(sql,[], (error,rows) => {
        if (error) {
            return res.status(500).send({
                message: error,
            });
        }


        if(isEmpty(rows)){
            const sql = `
                insert into 
                    users (name, password, type)
                values 
                    ("${username}" ,"${password}" ,"user")
                ;`;

            con.query(sql, [], (error) => {
                if (error) {
                    return res.status(500).send({
                        message: error,
                    });
                }

                return res.status(200).send({
                    message: "Successfully signed up",
                });
            });
        }

        else {
            return res.status(409).send({
                message: "That username is taken",
            });
        }
    });
};

module.exports = registration;