import { useReducer } from 'react'
import * as R from 'ramda'

import makeSeedData from '../shared/seedData'
import {
  addMetadata,
  assignGroup,
  getLastNameFirstLetter,
  normalize,
  normalizePhone,
  denormalize,
  initializeFavorites,
  omitWhenPropIsEmpty,
  sortByProp,
} from '../shared/utils'

export const types = {
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
  UPDATE_PARAM: 'UPDATE_PARAM',
}

export function reducer(state, { type, payload }) {
  switch (type) {
    case types.TOGGLE_FAVORITE:
      return { ...state, [payload]: !state[payload] }
    default:
      return state
  }
}

export function paramReducer(state, { type, payload }) {
  switch (type) {
    case types.UPDATE_PARAM:
      return { ...state, ...payload }
    default:
      return state
  }
}

export const handleClick = id => e =>
  dispatch({ type: 'TOGGLE_FAVORITE', payload: id })

export const useFavoritesReducer = contacts => {
  const [state, dispatch] = useReducer(
    reducer,
    R.reduce(
      (acc, curr) => ({ ...acc, [curr]: contacts[curr].favorite }),
      {},
      R.keys(contacts),
    ),
  )
  return [state, dispatch]
}

const makeEntity = i => ({
  id: i,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  phone: i % 8 !== 0 ? faker.phone.phoneNumber() : '',
})

const forEachIndexed = R.addIndex(R.forEach)

export function useParamReducer() {
  const [state, dispatch] = useReducer(paramReducer, {
    required: 'prop',
    sortFields: ['firstName', 'lastName'],
  })
  return [state, dispatch]
}

export const buildDirectoryContacts = R.pipe(
  denormalize,
  addMetadata,
  initializeFavorites,
  omitWhenPropIsEmpty('phone'),
  sortByProp('lastName'),
  sortByProp('firstName'),
  R.map(
    R.evolve({
      phone: normalizePhone,
    }),
  ),
  R.map(assignGroup),
)

export const buildDirectoryGroups = R.pipe(
  R.groupBy(getLastNameFirstLetter),
  R.map(R.chain(R.prop('id'))),
)

export function useData(n, state) {
  const data = makeSeedData(n)
  console.log('DEBUG::\n\n\ndata\n', data)

  const contacts = buildDirectoryContacts(data)
  const group = buildDirectoryGroups(contacts)

  console.log(contacts)
  console.log('DEBUG::\n\n\ngroup\n', group)

  return { contacts: normalize(contacts), group }
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
