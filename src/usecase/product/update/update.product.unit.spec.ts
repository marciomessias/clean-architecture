import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase"

const product = ProductFactory.create("a", "Product 1", 10)

const input = {
  id: product.id,
  name: "Product Updated",
  price: 20
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test for update product use case", () => {

  it("should update a product", async () => {
    const productRepository = MockRepository();
    const useCase = new UpdateProductUseCase(productRepository);

    const result = await useCase.execute(input);

    expect(result).toEqual({
      id: input.id,
      name: input.name,
      price: input.price
    })
  })
})