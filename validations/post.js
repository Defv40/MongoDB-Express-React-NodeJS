import { body } from "express-validator";
export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({min: 5}),
    body('text', "Введите текст статьи").isLength({min: 6}).isString(),
    body('tags', 'Неверный формат тэгов (укажите массив)').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString()
]

