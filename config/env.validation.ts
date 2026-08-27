import Joi from "joi";


export const enValidationSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', "production", 'test').default('development'),
    PORT: Joi.number().default(3000),
    DATABASE_URL: Joi.string().optional(),
    JWT_SECRET: Joi.string().optional(),
})