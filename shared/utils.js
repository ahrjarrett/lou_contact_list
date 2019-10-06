import * as R from 'ramda'

import data from '../shared/seedData'

let count = 1000

export const generateId = R.compose(
  R.toString,
  () => count++,
)

//const logObjectValues = (value, key) => console.log(key + ':' + value, '\n')

export const exists = R.complement(R.isEmpty)

export const mapIndexed = R.addIndex(R.map)

export const trace = R.tap(console.log)

export const addMetadata = R.map(x => R.assoc('id', generateId(), x))

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

const preprocessEntity = R.pipe(addMetadata)

const getLastNameFirstLetter = R.compose(
  R.head,
  R.prop('lastName'),
)

export const buildUpDirectory = R.pipe(
  preprocessEntity,
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

//export const deriveFavorites = R.pipe(
//  preprocessEntity,
//  omitWhenPropIsEmpty('phone'),
//  sortByProp('firstName'),
//  sortByProp('lastName'),
//  R.map(
//    R.evolve({
//      phone: normalizePhone,
//    }),
//  ),
//  R.groupBy(
//    R.compose(
//      R.head,
//      R.prop('lastName'),
//    ),
//buildContactGroups //  ),
//)

const normalize = R.pipe(R.indexBy(R.prop('id')))

const directory = buildUpDirectory(data.contacts)
const groups = buildDirectoryGroups(directory)
const normalized = normalize(directory)

const getEntities = () => {
  return {
    contacts: {
      byId: R.indexBy(R.prop('id'))(directory),
      allIds: R.map(R.prop('id'))(directory),
    },
    groups,
  }
}

const entities = getEntities()

const selectEntitiesByGroup = entity => group =>
  entity.allIds
    .map(id => entity.byId[id])
    .filter(x => group.includes(x.group))

console.log(entities)
console.log(
  "DEBUG::\n\n\nselectEntitiesByGroup('A')\n",
  selectEntitiesByGroup(entities.contacts)('L'),
  selectEntitiesByGroup(entities.contacts)('A'),
  selectEntitiesByGroup(entities.contacts)('Z'),
)

//console.log('DEBUG::\n\n\ndirectory\n', directory)
//console.log('DEBUG::\n\n\ngroups\n', groups)
//console.log('DEBUG::\n\n\nnormalized\n', normalized)

//const flippedProp = R.flip(R.prop)

//const mergeGroupsIntoDirectory = R.pipe(
//  R.map(x => {
//    console.group('YOOOO')
//    console.log('\nx.lastName', x.lastName)
//    console.log('\nR.head(x.lastName)', R.head(x.lastName))
//    console.log('\ngroups[R.head(x.lastName)]', groups[R.head(x.lastName)])
//    console.groupEnd()
//
//    return R.assoc('group', groups[R.head(x.lastName)], x)
//  }),
//)
//
//console.log('DEBUG::\n\n\ndata\n', data)
//console.log('DEBUG::\n\n\ngroups\n', groups)
//
//console.log('merging:', mergeGroupsIntoDirectory(directory))
