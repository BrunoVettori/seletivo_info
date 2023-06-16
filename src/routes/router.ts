import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { Client } from "pg";

import Carro from "../Carro";

const routes = Router();

const carro = new Carro();

routes.post(
  "/carro",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      placa: Joi.string().min(7).max(7).required(),
      chassi: Joi.string().min(17).max(17).required(),
      renavam: Joi.string().required(),
      modelo: Joi.string().required(),
      marca: Joi.string().required(),
      ano: Joi.number().required(),
    }),
  }),
  carro.Create
);

routes.get("/carro/:placa", carro.Read);

routes.get("/carro", carro.ReadAll);

routes.put(
  "/carro",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      placa_original: Joi.string().min(7).max(7).required(),
      placa: Joi.string().min(7).max(7),
      chassi: Joi.string().min(17).max(17),
      renavam: Joi.string(),
      modelo: Joi.string(),
      marca: Joi.string(),
      ano: Joi.number(),
    }),
  }),
  carro.Update
);

routes.delete(
  "/carro",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      placa: Joi.string().min(7).max(7).required(),
    }),
  }),
  carro.Delete
);

export default routes;
