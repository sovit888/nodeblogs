const { check } = require('express-validator');
const sameValidations=[
    check("email")
    .exists()
    .withMessage("the email should not be empty")
    .isEmail()
    .withMessage("please enter a valid email address"),
    check('password')
     .exists()
     .withMessage('Password should not be empty')      
    .isLength({ min: 8 })
    .withMessage('Password should have minimum eight characters, with least one letter, one number and one special character')  
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)
    .withMessage('Password should have at least one letter, one number and one special character')
]
exports.signinValidations=[
...sameValidations,
    check("username")
     .exists()
     .withMessage("the username field cannot be empty")
     .isLength({min:6})
     .withMessage("username should have length of at least 6 with 1 number and 1 capital letter") 
     .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$.!%*#?&]{6,}$/)
    .withMessage('Username should have at least one capital letter andone number')   
  ]
  exports.loginValidations=[...sameValidations]

  exports.resetValidations=[
    check('confirmpassword')
    .exists()
    .withMessage('Confirm Password should not be empty')      
   .isLength({ min: 8 })
   .withMessage('Confirm Password should have minimum eight characters, with least one letter, one number and one special character')  
   .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)
   .withMessage('Confirm Password should have at least one letter, one number and one special character'),
   check('newpassword')
   .exists()
   .withMessage('New Password should not be empty')      
  .isLength({ min: 8 })
  .withMessage('New Password should have minimum eight characters, with least one letter, one number and one special character')  
  .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)
  .withMessage(' New Password should have at least one letter, one number and one special character')
  ]