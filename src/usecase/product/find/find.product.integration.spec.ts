import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("Unit test for find product use case", () => {

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

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    const product = new Product("1", "Product 1", 10);

    await productRepository.create(product);

    const input = {
      id: "1",
    }

    const output = {
      id: "1",
      name: "Product 1",
      price: 10
    }

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  })

  it("should not find a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    const product = new Product("2", "Product 2", 20);

    await productRepository.create(product);

    const input = {
      id: "1",
    }

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrowError("Product not found")
  })
})