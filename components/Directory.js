import React, { useContext, useReducer } from 'react'
import dynamic from 'next/dynamic'
import * as R from 'ramda'

import { Styles } from '../shared/context'
import { selectEntitiesByGroup } from '../shared/selectors'

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

const makeListRenderer = (
  styles,
  handleClick,
  contacts,
  groups,
) => doesFilterFavorites => state => {
  return R.keys(groups).map((groupId, index) => {
    const groupedContacts = selectEntitiesByGroup(contacts)(groupId)

    const filteredContacts = !doesFilterFavorites
      ? groupedContacts
      : groupedContacts.filter(({ id }) => state[id])

    console.log('DEBUG::\n\n\ngroupedContacts\n', groupedContacts)
    console.log('DEBUG::\n\n\nfilteredContacts\n', filteredContacts)

    return (
      <div key={groupId}>
        <List
          handleClick={handleClick}
          heading={groupId}
          items={filteredContacts}
          group={groupId}
          style={styles.listWrapper}
          favorites={state}
        />
      </div>
    )
  })
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

  const renderList = makeListRenderer(
    styles,
    handleClick,
    contacts,
    groups,
  )
  const renderContacts = renderList(false)
  const renderFavorites = renderList(true)

  console.log('DEBUG::\n\n\nstate\n', state)

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ width: '50%' }}>
        <h1>All Contacts</h1>
        {renderContacts(state)}
      </div>
      <div style={{ width: '50%' }}>
        <h1>Favorites</h1>
        {renderFavorites(state)}
      </div>
    </div>
  )
}
