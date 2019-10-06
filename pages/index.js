import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useReducer,
} from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import {
  always,
  compose,
  keys,
  filter,
  pipe,
  map,
  reduce,
  forEachObjIndexed,
  T,
  is,
  cond,
  prop,
  propEq,
  type,
  identity,
  tryCatch,
} from 'ramda'

import ContactItem from '../components/ContactItem'
import Context, { Data, Styles } from '../shared/context'
import * as _ from '../shared/utils'

const List = dynamic(() => import('../components/List'))

const selectContactById = entities => id => entities.contacts[id]

const renderContacts = ({ handleClick, contacts, groups }) => {
  const styles = useState(Styles)
  return Object.keys(groups).map(groupId => {
    const contactIds = groups[groupId]
    const groupContacts = contactIds.map(id => contacts[id])
    return (
      <div key={groupId} style={styles.listWrapper}>
        <List
          heading={groupId}
          items={groupContacts}
          group={groupId}
          handleClick={handleClick}
        />
      </div>
    )
  })
}

const renderFavorites = ({ handleClick, contacts, groups }) => {
  const styles = useState(Styles)
  return Object.keys(groups).map(groupId => {
    const contactIds = groups[groupId]
    const groupContacts = contactIds.map(id => contacts[id])
    const favorites = _.filterFavorites(groupContacts)
    return (
      <div key={groupId} style={styles.listWrapper}>
        <List
          heading={groupId}
          items={favorites}
          group={groupId}
          handleClick={handleClick}
        />
      </div>
    )
  })
}

function reducer(state, { type, payload }) {
  switch (type) {
    case 'TOGGLE_FAVORITE': {
      return { ...state, [payload]: !state[payload] }
    }
  }
}

export default function Index() {
  const styles = useContext(Styles)
  const data = useContext(Data)
  const { contacts, groups } = _.getEntities(data)
  const [state, dispatch] = useReducer(
    reducer,
    reduce(
      (acc, curr) => ({ ...acc, [curr]: contacts[curr].favorite }),
      {},
      keys(contacts),
    ),
  )

  const handleClick = id => e =>
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id })

  console.log('DEBUG::\n\n\ncontacts\n', contacts)
  console.log('DEBUG::\n\n\ngroups\n', groups)
  console.log('DEBUG::\n\n\nstate\n', state)

  //const directory = _.buildUpDirectory(contacts)
  //const groups = _.buildDirectoryGroups(directory)

  //console.log('DEBUG::\n\n\ndirectory\n', directory)
  //console.log('DEBUG::\n\n\ngroups\n', groups)

  useEffect(() => {
    document.title = 'Contacts'
  }, [])

  return (
    <Context>
      <div style={styles.home}>
        <Head />
        <h1>Directory</h1>

        {renderContacts({ contacts, groups, handleClick })}
        {renderFavorites({ contacts, groups, handleClick })}
      </div>
    </Context>
  )
}
