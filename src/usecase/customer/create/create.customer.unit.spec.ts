import CreateCustomerUseCase from "./create.customer.usecase"

const input = {
  name: "John",
  address: {
    street: "Street",
    number: 123,
    zip: "Zip",
    city: "City"
  }
}

const mockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test for customer create use case", () => {
  
  it("should create a customer", async () => {
    const customerRepository = mockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const result = await useCase.execute(input);

    expect(result).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city
      }
    })

  })

  it("should throw an error when name is missing", async () => {
    const customerRepository = mockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    input.name = "";

    await expect(useCase.execute(input)).rejects.toThrow("Name is required")
  })

  it("should throw an error when street is missing", async () => {
    const customerRepository = mockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    input.address.street = "";

    await expect(useCase.execute(input)).rejects.toThrow("Street is required")
  })

})