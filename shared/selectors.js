import * as R from 'ramda'

export const selectEntitiesByGroup = entity => group =>
  R.keys(entity)
    .map(id => entity[id])
    .filter(x => group.includes(x.group))
