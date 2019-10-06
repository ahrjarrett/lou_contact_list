import * as R from 'ramda'

export const exists = R.complement(R.isEmpty)
