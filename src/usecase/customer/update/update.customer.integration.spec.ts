import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "../create/create.customer.usecase";
import UpdateCustomerUseCase from "./update.customer.usecase";

const inputCreate = {
  name: "John",
  address: {
    street: "Street",
    number: 123,
    zip: "Zip",
    city: "City"
  }
}

const inputUpdate = {
  name: "John Updated",
  address: {
    street: "Street Updated",
    number: 1234,
    zip: "Zip Updated",
    city: "City Updated"
  }
}

describe("Unit test for update customer use case", () => {

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

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    const customer = await createCustomerUseCase.execute(inputCreate);

    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    const result = await updateCustomerUseCase.execute({
      id: customer.id,
      ...inputUpdate
    });

    expect(result).toEqual({
      id: customer.id,
      name: inputUpdate.name,
      address: {
        street: inputUpdate.address.street,
        number: inputUpdate.address.number,
        zip: inputUpdate.address.zip,
        city: inputUpdate.address.city
      }
    })
  })
})