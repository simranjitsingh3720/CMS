// export default (req, res) => {
//   res.status(200).json([
//     {
//       "id": "1",
//       "title": "Ditch the dreaded <div />. Semantic HTML elements we should use instead"
//     },
//     {
//       "id": "2",
//       "title": "Monday motivation - How I got into code"
//     },
//     {
//       "id": "3",
//       "title": "How to setup path aliases for development with Next.js & Jest"
//     }
//   ]);
// }

// signup route
// 1. in the request we will send user information.
// 2. validate user information such as email, password, etc....
// 3. then we have to validate if user already exists or not.
// 4. if not exists, then insert user into mysql db using sequelize. (hash the password before using bcrypt)
// 5. if exists then prompt("already exists")
// 6. go to db and check whether user inserted? (testing)
// 7. maintaing session also with help of express-session and print the token (POSTMAN).
const { signUp } = require('../../../controllers/auth-controller');

const signUpHandler = (req, res) => {
  switch (req.method) {
    case 'POST':
      return signUp(req, res);
      // break;
    default:
      return res.send('IN DEFAULT');
  }
};

module.exports = signUpHandler;
