import * as R from 'ramda'

export const exists = R.complement(R.isEmpty)

export const mapIndexed = R.addIndex(R.map)

export const normalize = R.pipe(R.indexBy(R.prop('id')))

export const addMetadata = mapIndexed((idx, x) => ({ id: R.toString(idx), ...x }))

const preprocessEntity = R.pipe(
  addMetaData,
  normalize,
)

export const buildDirectory = preprocessEntity

export const buildFavorites = preprecessEntity
