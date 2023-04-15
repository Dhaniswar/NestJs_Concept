/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as Joi from 'joi';
import * as _ from 'lodash';
import { API_DEFAULT_PORT } from '../model/constant';
import { IConfig } from '../interfaces/config.interface';

export const config = (): IConfig => {
  const env = process.env;

  const validationSchema = Joi.object().unknown().keys({
    API_PORT: Joi.string().required(),
    SWAGGER_ENABLE: Joi.string().optional(),

    TYPEORM_HOST: Joi.string().required(),
    TYPEORM_PORT: Joi.string().required(),
    TYPEORM_USERNAME: Joi.string().required(),
    TYPEORM_PASSWORD: Joi.string().required(),
    TYPEORM_DATABASE: Joi.string().required(),
    TYPEORM_SYNCHRONIZE: Joi.string().required(),
    TYPEORM_MIGRATIONS_AUTO_RUN: Joi.string().required(),
  });

  const result = validationSchema.validate(env);

  if (result.error) {
    throw new Error(`Configuration not valid: ${result.error.message}`);
  }

  return {
    apiPort: _.toNumber(env.API_PORT) || API_DEFAULT_PORT,
    swagger: {
      enabled: env.SWAGGER_ENABLE === 'true',
    },

    database: {
      host: env.TYPEORM_HOST!,
      port: _.toNumber(env.TYPEORM_PORT),
      username: env.TYPEORM_USERNAME!,
      password: env.TYPEORM_PASSWORD!,
      database: env.TYPEORM_DATABASE!,
      entities: env.TYPEORM_ENTITIES!,
      synchronize: env.TYPEORM_SYNCHRONIZE === 'true',
      migrationsAutoRun: env.TYPEORM_MIGRATIONS_AUTO_RUN === 'true',
    },

    firebase: {
      projectId: env.FIREBASE_PROJECT_ID!,
      clientEmail: env.FIREBASE_CLIENT_EMAIL!,
      privateKey: env.FIREBASE_PRIVATE_KEY!,
    },

    sendgrid: {
      senderEmail: env.SENDGRID_SENDER_EMAIL!,
      user: env.SENDGRID_USER!,
      apiKey: env.SENDGRID_API_KEY!,
      host: env.SENDGRID_HOST!,
    },
  };
};
