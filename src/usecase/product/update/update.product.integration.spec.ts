import { Sequelize } from "sequelize-typescript";
import UpdateProductUseCase from "./update.product.usecase"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";

const inputCreate = {
  name: "Product Create",
  price: 10
}

const inputUpdate = {
  name: "Product Update",
  price: 20
}

describe("Unit test for update product use case", () => {

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

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const product = await createProductUseCase.execute(inputCreate);

    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const result = await updateProductUseCase.execute({
      id: product.id,
      ...inputUpdate
    });

    expect(result).toEqual({
      id: product.id,
      name: inputUpdate.name,
      price: inputUpdate.price
    })
  })
})