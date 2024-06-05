import CreateProductUseCase from "./create.product.usecase"

const input = {
  name: "Product 1",
  price: 10
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  }
}

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const result = await useCase.execute(input);

    expect(result).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    })
  })

  it("should throw an error when name is missing", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const inputWithEmptyName = {
      ...input,
      name: "",
    }

    await expect(useCase.execute(inputWithEmptyName)).rejects.toThrow("Name is required")
  })

  it("should throw an error when price is less than zero", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    input.price = -1;

    await expect(useCase.execute(input)).rejects.toThrow("Price must be greater than zero")
  })
})