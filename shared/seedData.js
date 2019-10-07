import faker from 'faker'

export default function makeSeedData(n) {
  return Array(n)
    .fill(undefined)
    .map((_, i) => ({
      id: i,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      phone: faker.phone.phoneNumber(),
    }))
    .reduce((acc, curr) => ({ ...acc, [curr.id]: curr }))
}
