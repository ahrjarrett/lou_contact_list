import faker from 'faker'

export default function makeSeedData(n) {
  return Array(n)
    .fill(null)
    .map((_, i) => ({
      id: i,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      phone: i % 8 !== 0 ? faker.phone.phoneNumber() : '',
    }))
}

// Original data:
const _contacts = [
  { firstName: 'Allen', lastName: 'Lane', phone: '542-987-3456' },
  { firstName: 'Trey', lastName: 'Smith', phone: '' },
  { firstName: 'Richard', lastName: 'Walker', phone: '542-737-3246' },
  { firstName: 'Alejandro', lastName: 'Lane', phone: '542-345-8721' },
  { firstName: 'Bob', lastName: 'Larson', phone: '(542) 321-3456' },
  { firstName: 'Richard', lastName: 'Julian', phone: '542-211-5678' },
  { firstName: 'Bill', lastName: 'Allen', phone: '542-654-2154' },
]
