import * as R from 'ramda'

import data from '../shared/seedData'

let count = 1000

export const generateId = R.compose(
  R.toString,
  () => count++,
)

export const exists = R.complement(R.isEmpty)

export const mapIndexed = R.addIndex(R.map)

export const trace = R.tap(console.log)

// Call R.once per entity closure so we don't continue incrementing ids on state change:
export const addId = R.once(R.map(x => R.assoc('id', generateId(), x)))
export const initializeFavorites = R.map(R.assoc('favorite', false))

const addMetadata = R.pipe(
  addId,
  initializeFavorites,
)

const omitWhenPropIsEmpty = p => R.filter(R.propSatisfies(exists, p))

const sortByProp = p =>
  R.sortBy(
    R.pipe(
      R.prop(p),
      R.toLower,
    ),
  )

// normalizePhone :: String -> String
const stripNonDigits = R.replace(/\D/g, '')
const normalize10DigitPhone = str =>
  `(${str.slice(0, 3)}) ${str.slice(3, 6)}-${str.slice(6)}`
const normalizePhone = R.pipe(
  stripNonDigits,
  normalize10DigitPhone,
)

const phoneLens = R.lens(R.prop('phone'))

const getLastNameFirstLetter = R.compose(
  R.head,
  R.prop('lastName'),
)

export const buildUpDirectory = R.pipe(
  addMetadata,
  omitWhenPropIsEmpty('phone'),
  sortByProp('firstName'),
  sortByProp('lastName'),
  R.map(
    R.evolve({
      phone: normalizePhone,
    }),
  ),
  R.pipe(
    R.map(x => R.assoc('group', getLastNameFirstLetter(x), x)),
    R.identity,
  ),
)

export const buildDirectoryGroups = R.pipe(
  R.groupBy(
    R.compose(
      R.head,
      R.prop('lastName'),
    ),
  ),
  R.map(R.chain(R.prop('id'))),
  //R.indexBy(R.prop('id')),
)

const contacts = buildUpDirectory(data.contacts)
const groups = buildDirectoryGroups(contacts)

const normalize = R.pipe(R.indexBy(R.prop('id')))

const makeEntities = (contacts, groups) => () => ({
  contacts: normalize(contacts),
  groups,
})

export const getEntities = makeEntities(contacts, groups)

export const selectEntitiesByGroup = entity => group =>
  R.keys(entity)
    .map(id => entity[id])
    .filter(x => group.includes(x.group))
