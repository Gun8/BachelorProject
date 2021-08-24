const con = require('../mysql');
const isEmpty = require("is-empty");

const auth = (req, res) => {
    const { username, password } = req.body;

    const query = `
    SELECT
      *
    FROM
      users
    WHERE name = '${username}' AND password = '${password}'
  ;`;

    return con.query(query, [], (error, rows) => {
        if (error) {
            return res.status(500).send({
                message: error,
            });
        }

        if(!isEmpty(rows)){
            return res.status(200).send({
                message: "Successfully logged in",
            });
        }
        else{
            return res.status(401).send({
                    message: "Incorrect username or password"
            });
        }
    });
};

module.exports = auth;