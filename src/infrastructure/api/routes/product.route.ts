import express, { Request, Response } from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const useCase = new CreateProductUseCase(new ProductRepository());

  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price
    };
    const output = await useCase.execute(productDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  try {
    const useCase = new ListProductUseCase(new ProductRepository());
    const output = await useCase.execute({});
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});