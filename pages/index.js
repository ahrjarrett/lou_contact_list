import React, { useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { type, identity, tryCatch } from 'ramda'

import ContactItem from '../components/ContactItem'
import Context, { Data, Styles } from '../shared/context'
import { buildDirectory, deriveFavorites } from '../shared/utils'

const List = dynamic(() => import('../components/List'))

export default function Index() {
  const { contacts } = useContext(Data)
  const styles = useContext(Styles)
  const directory = buildDirectory(contacts)
  const favorites = deriveFavorites(contacts)

  useEffect(() => {
    document.title = 'Contacts'
  }, [])

  return (
    <Context>
      <div style={styles.home}>
        <Head />
        {Object.keys(directory).map((key, index) => (
          <div key={key}>
            <List
              heading={!index ? 'Directory' : null}
              items={directory[key]}
              group={key}
              style={styles.List}
            />
          </div>
        ))}
        {<List heading="Favorites" items={favorites} component={<ContactItem />} />}
      </div>
    </Context>
  )
}
