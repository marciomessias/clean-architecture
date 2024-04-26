import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import Address from "../../../domain/customer/value-object/address"
import ListCustomerUseCase from "./list.customer.usecase"

const customer1 = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("Street", 123, "Zip", "City")
)

const customer2 = CustomerFactory.createWithAddress(
  "Jane Doe",
  new Address("Street", 123, "Zip", "City")
)

const customers = [customer1, customer2]

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve(customers)),
  }
}

describe("Unit test for list customer use case", () => {

  it("should list all customers", async () => {
    const customerRepository = MockRepository();
    const useCase = new ListCustomerUseCase(customerRepository);

    const result = await useCase.execute({});

    expect(result.customers.length).toBe(2);
    
    expect(result.customers[0].id).toBe(customer1.id);
    expect(result.customers[0].name).toBe(customer1.name);
    expect(result.customers[0].address.street).toBe(customer1.Address.street);

    expect(result.customers[1].id).toBe(customer2.id);
    expect(result.customers[1].name).toBe(customer2.name);
    expect(result.customers[1].address.street).toBe(customer2.Address.street);
  })
})