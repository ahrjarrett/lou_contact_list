import React, { useContext, useReducer, useState } from 'react'
import dynamic from 'next/dynamic'
import * as R from 'ramda'

import {
  useFavoritesReducer,
  useData,
  useParamReducer,
  handleClick,
} from '../shared/hooks'
import { Styles } from '../shared/context'
import { selectEntitiesByGroup } from '../shared/selectors'

const List = dynamic(() => import('../components/List'))

const makeListRenderer = (
  styles,
  handleClick,
  contacts,
  groups,
) => doesFilterFavorites => state => {
  return Object.keys(groups).map((groupId, index) => {
    const groupedContacts = selectEntitiesByGroup(contacts)(groupId)
    const filteredContacts = !doesFilterFavorites
      ? groupedContacts
      : groupedContacts.filter(({ id }) => state[id])

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

export default function Directory() {
  const styles = useContext(Styles)
  const { contacts, groups } = useData()
  const [paramState, paramDispatch] = useParamReducer()
  const [favoritesState, dispatchToFavorites] = useFavoritesReducer(
    contacts,
  )

  console.group('in Directory')

  console.log('requiredProp', requiredProp)
  console.log('state', state)
  console.groupEnd()

  const renderList = makeListRenderer(
    styles,
    handleClick,
    contacts,
    groups,
    state,
  )
  const renderContacts = renderList(false)
  const renderFavorites = renderList(true)

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ width: '50%' }}>
        <h1>All Contacts</h1>
      </div>
      <div style={{ width: '50%' }}>
        <h1>Favorites</h1>
      </div>
    </div>
  )
}
// {renderContacts(state)}
// {renderFavorites(state)}
