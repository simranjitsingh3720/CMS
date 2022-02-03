
const {signIn} = require("../../../controllers/auth_controller");


const signInHandler = (req, res) => {
    switch(req.method) {
        case 'POST':
            return signIn(req, res);
            break;
        default:
            res.send("IN DEFAULT");
    }
}

module.exports = signInHandler;