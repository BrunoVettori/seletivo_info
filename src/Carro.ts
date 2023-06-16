import { Request, Response } from "express";
import { Client } from "pg";

import ConnectDatabase from "./database/Database";

import fs from "fs";
import path from "path";

require("dotenv").config();

class Carro {
  public async Create(request: Request, response: Response) {
    const client = await ConnectDatabase();

    let { placa, chassi, renavam, modelo, marca, ano } = request.body;

    placa = placa.toUpperCase();
    renavam = renavam.toUpperCase();
    chassi = chassi.toUpperCase();
    modelo = modelo.toUpperCase();
    marca = marca.toUpperCase();

    let query_result;

    try {
      query_result = await client.query(
        `INSERT INTO info.carro (placa, chassi, renavam, modelo, marca, ano, created_at)
        VALUES ('${placa}', '${chassi}', '${renavam}', '${modelo}', '${marca}', ${ano}, now());`
      );
    } catch (e) {
      response = ErrorHandler(e.message, response);

      return response;
    }

    await client.end();

    if (query_result.rowCount == 1) {
      return response.json("Veículo criado com sucesso");
    } else {
      return response.status(500).json("Erro ao cadastrar o veículo");
    }
  }

  public async Read(request: Request, response: Response) {
    const placa = request.params.placa.replace(":", "").toUpperCase();

    const client = await ConnectDatabase();

    const query_result = await client.query(
      `SELECT * FROM info.carro WHERE placa = '${placa}'`
    );

    await client.end();

    return response.json(query_result.rows[0]);
  }

  public async ReadAll(request: Request, response: Response) {
    const client = await ConnectDatabase();

    const query_result = await client.query(`SELECT * FROM info.carro`);

    await client.end();

    return response.json(query_result.rows);
  }

  public async Update(request: Request, response: Response) {
    const client = await ConnectDatabase();

    const placa_original = request.body.placa_original.toUpperCase();

    if (!(await Verify(placa_original))) {
      return response
        .status(400)
        .json("Não foi encontrado nenhum veículo com essa placa");
    }

    delete request.body.placa_original;

    const entries = Object.entries(request.body);

    let update_string = "";

    for (let index = 0; index < entries.length; index++) {
      if (index != 0) {
        update_string += ",";
      }

      let data: string | any;

      const field = entries[index][0];

      data = entries[index][1];

      if (field == "ano") {
        update_string += ` ${field} = ${data} `;
      } else {
        update_string += ` ${field} = '${data.toUpperCase()}' `;
      }
    }

    update_string += ", updated_at = now()";

    let query_result;

    try {
      query_result = await client.query(
        `UPDATE info.carro SET ${update_string} WHERE placa = '${placa_original}'`
      );
    } catch (e) {
      response = ErrorHandler(e.message, response);

      return response;
    }

    await client.end();

    if (query_result.rowCount == 1) {
      return response.json("Veículo Atualizado com sucesso");
    } else {
      return response.status(500).json("Erro ao atualizar o veículo");
    }


  }

  public async Delete(request: Request, response: Response) {
    const client = await ConnectDatabase();

    const placa = request.body.placa.toUpperCase();

    const query_result = await client.query(
      `DELETE FROM info.carro WHERE placa = '${placa}'`
    );

    await client.end();

    if (query_result.rowCount == 1) {
      return response.json("Veículo Deletado com sucesso");
    } else {
      return response.status(500).json("Erro ao deletar o veículo");
    }
  }
}

function ErrorHandler(message: string, response: Response) {
  if (
    message.includes(
      `duplicate key value violates unique constraint "carro_placa_key"`
    )
  ) {
    return response.status(409).json("Veículo com essa placa já está criado");
  }

  if (
    message.includes(
      `duplicate key value violates unique constraint "carro_chassi_key"`
    )
  ) {
    return response.status(409).json("Veículo com esse chassi já está criado");
  }

  if (
    message.includes(
      `duplicate key value violates unique constraint "carro_renavam_key"`
    )
  ) {
    return response.status(409).json("Veículo com este renavam já está criado");
  }

  return response.status(400).json({
    message: "Erro ao cadastrar no banco de dados",
    error: message,
  });
}

async function Verify(placa: string) {
  placa = placa.toUpperCase();

  const client = await ConnectDatabase();

  const query_result = await client.query(
    `SELECT * FROM info.carro WHERE placa = '${placa}'`
  );

  await client.end();

  if (query_result.rowCount == 1) {
    return true;
  } else {
    return false;
  }
}

export default Carro;
