import React, { useContext, useReducer } from 'react'
import dynamic from 'next/dynamic'
import * as R from 'ramda'

import { selectEntitiesByGroup } from '../shared/utils'
import { Styles } from '../shared/context'

const List = dynamic(() => import('../components/List'))

export function reducer(state, { type, payload }) {
  switch (type) {
    case 'TOGGLE_FAVORITE': {
      return { ...state, [payload]: !state[payload] }
    }
    default:
      return state
  }
}

export default function Directory({ contacts, groups }) {
  const styles = useContext(Styles)

  const handleClick = id => e =>
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id })

  const [state, dispatch] = useReducer(
    reducer,
    R.reduce(
      (acc, curr) => ({ ...acc, [curr]: contacts[curr].favorite }),
      {},
      R.keys(contacts),
    ),
  )

  console.log('DEBUG::\n\n\nstate\n', state)

  return (
    <div>
      {R.keys(groups).map((groupId, index) => {
        const groupedContacts = selectEntitiesByGroup(contacts)(groupId)

        console.log('DEBUG::\n\n\ngroupedContacts\n', groupedContacts)

        return (
          <div key={groupId}>
            <List
              handleClick={handleClick}
              heading={groupId}
              items={groupedContacts}
              group={groupId}
              style={styles.listWrapper}
              favorites={state}
            />
          </div>
        )
      })}
    </div>
  )
}
