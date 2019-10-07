import * as R from 'ramda'

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

export const flipCoin = () => 50 > Math.random() * 100

export const addMetadata = R.pipe(addId)

export const omitWhenPropIsEmpty = p =>
  R.filter(R.propSatisfies(exists, p))

export const sortByProp = p =>
  R.sortBy(
    R.pipe(
      R.prop(p),
      R.toLower,
    ),
  )

export const denormalize = R.pipe(
  R.toPairs,
  R.map(R.last),
)

export const normalize = R.pipe(R.indexBy(R.prop('id')))

const stripNonDigits = R.replace(/\D/g, '')
const normalize10DigitPhone = str =>
  `(${str.slice(0, 3)}) ${str.slice(3, 6)}-${str.slice(6)}`

// normalizePhone :: String -> String
export const normalizePhone = R.pipe(
  stripNonDigits,
  normalize10DigitPhone,
)

export const getLastNameFirstLetter = R.compose(
  R.head,
  R.prop('lastName'),
)

export const assignGroup = entity =>
  R.assoc('group', getLastNameFirstLetter(entity), entity)

const makeEntities = (contacts, groups) => () => ({
  contacts: normalize(contacts),
  groups,
})

//export const getEntities = makeEntities(contacts, groups)
