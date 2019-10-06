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

export const addId = R.once(R.map(x => R.assoc('id', generateId(), x)))
export const initializeFavorite = R.map(R.assoc('favorite', false))

export const filterFavorites = R.filter(
  R.propEq('favorite', Boolean(true)),
)

const omitWhenPropIsEmpty = p => R.filter(R.propSatisfies(exists, p))

const sortByProp = p =>
  R.sortBy(
    R.pipe(
      R.prop(p),
      R.toLower,
    ),
  )

const stripNonDigits = R.replace(/\D/g, '')
const normalize10DigitPhone = str =>
  `(${str.slice(0, 3)}) ${str.slice(3, 6)}-${str.slice(6)}`

// normalizePhone :: String -> String
const normalizePhone = R.pipe(
  stripNonDigits,
  normalize10DigitPhone,
)

export const addMetadata = R.pipe(
  addId,
  initializeFavorite,
)

const getLastNameFirstLetter = R.compose(
  R.head,
  R.prop('lastName'),
)

export const buildUpDirectory = state => data =>
  R.pipe(
    addMetadata,
    omitWhenPropIsEmpty(state.filterEmpty),
    sortByProp('firstName'),
    sortByProp('lastName'),
    R.map(
      R.evolve({
        phone: normalizePhone,
      }),
    ),
    R.map(x => R.assoc('group', getLastNameFirstLetter(x), x)),
  )(data)

export const buildGroupsFromContacts = R.pipe(
  R.groupBy(getLastNameFirstLetter),
  R.map(R.chain(R.prop('id'))),
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

export const getEntities = data => {
  const contacts = R.pipe(
    R.prop('contacts'),
    buildUpDirectory({ filterEmpty: 'phone' }),
  )(data)
  const groups = buildGroupsFromContacts(contacts)

  //const entitiesSpec = R.applySpec({
  //  //contacts: R.prop('contacts'),
  //  //  allIds: R.pipe(
  //  //    R.prop('contacts'),
  //  //    R.pluck('id'),
  //  //  ),
  //  //},
  //  groups: {
  //    byId: R.pipe(
  //      R.prop('groups'),
  //      R.mapObjIndexed((value, key) => ({
  //        id: key,
  //        contacts: value,
  //      })),
  //    ),
  //    allIds: R.pipe(
  //      R.prop('groups'),
  //      R.keys,
  //    ),
  //  },
  //})

  return { contacts: normalize(contacts), groups }
  //entitiesSpec({ contacts, groups })
}

const entities = getEntities(data)

//const selectEntitiesByGroup = entity => group =>
//  entity.allIds.map(id => entity.byId[id]).filter(x => group === x.group)

//console.log(entities)

//console.log(
//  selectEntitiesByGroup(entities.contacts)('L'),
//  '\n',
//  selectEntitiesByGroup(entities.contacts)('A'),
//  '\n',
//  selectEntitiesByGroup(entities.contacts)('Z'),
//  '\n',
//)

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
