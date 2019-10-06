import * as R from 'ramda'

let count = 0

export const generateId = R.compose(
  R.toString,
  () => count++,
)

export const exists = R.complement(R.isEmpty)

export const mapIndexed = R.addIndex(R.map)

//export const normalize = R.pipe(R.indexBy(R.prop('id')))

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
const normalize10DigitPhone = str => `(${str.slice(0, 3)}) ${str.slice(3, 6)}-${str.slice(6)}`
const normalizePhone = R.pipe(
  stripNonDigits,
  normalize10DigitPhone,
)

const phoneLens = R.lens(R.prop('phone'))

const preprocessEntity = R.pipe(addMetadata)

export const buildDirectory = R.pipe(
  preprocessEntity,
  R.identity,
  omitWhenPropIsEmpty('phone'),
  sortByProp('firstName'),
  sortByProp('lastName'),
  R.map(
    R.evolve({
      phone: normalizePhone,
    }),
  ),
  R.groupBy(
    R.compose(
      R.head,
      R.prop('lastName'),
    ),
  ),
)

export const deriveFavorites = R.pipe(
  preprocessEntity,
  R.identity,
)
