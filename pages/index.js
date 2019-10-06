import React, { useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { compose, forEachObjIndexed, T, is, cond, type, identity, tryCatch } from 'ramda'

import ContactItem from '../components/ContactItem'
import Context, { Data, Styles } from '../shared/context'
import * as _ from '../shared/utils'

const List = dynamic(() => import('../components/List'))

export default function Index() {
  const { contacts } = useContext(Data)
  const styles = useContext(Styles)
  const directory = _.buildUpDirectory(contacts)
  const groups = _.buildDirectoryGroups(directory)

  //console.log('DEBUG::\n\n\ndirectory\n', directory)
  //console.log('DEBUG::\n\n\ngroups\n', groups)

  useEffect(() => {
    document.title = 'Contacts'
  }, [])

  return (
    <Context>
      <div style={styles.home}>
        <Head />
        {Object.keys(directory).map((key, index) => (
          <div key={key}>
            {
              <List
                heading={!index ? 'Directory' : null}
                items={directory[key]}
                group={key}
                style={styles.List}
              />
            }
            {false && (
              <List heading="Favorites" items={favorites} component={<ContactItem />} />
            )}
          </div>
        ))}
      </div>
    </Context>
  )
}
