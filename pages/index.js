import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import * as R from 'ramda'

import makeSeedData from '../shared/seedData'

import ContactItem from '../components/ContactItem'
import Directory from '../components/Directory'
import Context from '../shared/context'
import { getEntities } from '../shared/utils'

export default function Index() {
  const response = getEntities()
  const { contacts, groups } = getEntities()

  //console.log(makeSeedData(20))
  //console.log(makeSeedData(40))

  useEffect(() => {
    document.title = 'Contacts'
  }, [])

  return (
    <Context>
      <div>
        <Head />
        <Directory contacts={contacts} groups={groups} />
      </div>
    </Context>
  )
}
