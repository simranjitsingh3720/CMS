const db = require('../db/models/index')
const bcrypt = require('bcrypt')
const signUp = async (req, res) => {
    const {body} = req;
    const {firstName, lastName, email, password} = body;
    let userOk = 1;
    let hashedPassword;
    if (!firstName || !lastName || !email || !password) {
        res.send("empty fields are not allowed!!!");
    }
    const validateEmail = (email) => {
         let re = /\S+@\S+\.\S+/;
         return re.test(email);
        }
        if (!validateEmail(email)) {
            res.send("Email format not correct");
        }
        let userFound;
        userFound = await db.User.findOne({attributes: ['email'], where: { email: email}});
        if (userFound !== null) {
            res.send("User with this email already exists");
        }// res.send("User with this email do not exists");
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
        const userInfo = {...body,"password": hashedPassword}
        if (userOk) {
            await db.User.create(userInfo).then(user => {
                res.send('User successfully inserted');
            }).catch(error => {
                res.send('Some problem in inserting user');
            });
        }
        else {
            res.send("User not allowed");
        }
    }




// signin route
// 1. in the request we will send user information.
// 2. then we have to validate if user already exists or not.
// 3. if  exists, then redirect him to dashboard.
// 4. if not exists then prompt("not exists")
// 5. maintaing session also with help of express-session and print the token (POSTMAN).
//const bcrypt = require('bcrypt');


const signIn = async (req, res) => {
    // res.send("I am sign in route");

    const {body} = req;
    // const username = body.username;
    // const password = body.password;

    const {email, password} = body;
    if(!email || !password){
        return res.status(400).send('requested email or password is missing');
    }
    // console.log('===================')
    // console.log(db.User);
    const user = await db.User.findOne({ where: { email } });
    if (bcrypt.compare(password, user.password)) {
        
        return user.authorize();
    }
    else{
        res.status(200).json("Invalid Password");
    }
    
}

module.exports = {
    signUp,
    signIn
}