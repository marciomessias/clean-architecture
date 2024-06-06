import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
  name: "John",
  address: {
    street: "Street",
    number: 123,
    zip: "Zip",
    city: "City"
  }
}

describe("Unit test for customer create use case", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const customer = new Customer("123", "John");
    const address = new Address("Street", 123, "Zip", "City");
    customer.changeAddress(address);

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
    const customerRepository = new CustomerRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const inputWithEmptyName = {
      ...input,
      name: "",
    }

    expect(() => {
      return useCase.execute(inputWithEmptyName)
    }).rejects.toThrow("Name is required")
  })

  it("should throw an error when street is missing", async () => {
    const customerRepository = new CustomerRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const inputWithEmptyStreet = {
      name: input.name,
      address: {
        ...input.address,
        street: "",
      }
    }

    expect(() => {
      return useCase.execute(inputWithEmptyStreet)
    }).rejects.toThrow("Street is required")
  })

})