const { check } = require('express-validator');
exports.blogValidations=[
    check('title')
     .exists()
     .withMessage('Title should not be empty')      
    .isLength({ min: 15 })
    .withMessage('Title should contain at leat 15 words') ,
    check('header')
     .exists()
     .withMessage('Header should not be empty')      
    .isLength({ min: 20 })
    .withMessage('Header should contain at leat 20 words') ,
    check('body')
     .exists()
     .withMessage('Body should not be empty')      
    .isLength({ min: 50 })
    .withMessage('Body should contain at leat 50 words') ,
    check('footer')
     .exists()
     .withMessage('Footer should not be empty')      
    .isLength({ min: 15 })
    .withMessage('Footer should contain at leat 15 words') 
]