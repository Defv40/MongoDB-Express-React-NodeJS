import { body } from "express-validator";

export const registerValidation = [
    body('email', "Неверная почта").isEmail(),
    body('password', "Пароль не менее 5 символов").isLength({min: 5}),
    body('fullName', "имя не короче 3 символов").isLength({min: 3}),
    body('avatarUrl', "Строка не является ссылкой").optional().isURL()
]

export const loginValidation = [
    body('email', "Неверный формат почты").isEmail(),
    body('password', 'почта должны быть не короче 6 символов').isLength({min: 6})
];