import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "./create.product.usecase"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

const input = {
  name: "Product 1",
  price: 10
}

describe("Unit test create product use case", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const result = await useCase.execute(input);

    expect(result).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    })
  })

  it("should throw an error when name is missing", async () => {
    const productRepository = new ProductRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const inputWithEmptyName = {
      ...input,
      name: "",
    }

    expect(() => {
      return useCase.execute(inputWithEmptyName)
    }).rejects.toThrow("Name is required")
  })

  it("should throw an error when price is less than zero", async () => {
    const productRepository = new ProductRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const inputWithPriceLessThanZero = {
      ...input,
      price: -1,
    }

    expect(() => {
      return useCase.execute(inputWithPriceLessThanZero)
    }).rejects.toThrow("Price must be greater than zero")
  })
})