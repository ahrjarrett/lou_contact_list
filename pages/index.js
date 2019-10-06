import React, { Fragment, useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { identity } from 'ramda'

import List from '../components/List'
import Context, { Data } from '../shared/context'

export default function Index() {
  const { contacts } = useContext(Data)
  const favorites = identity(contacts)

  useEffect(() => {
    document.title = 'Contacts'
  }, [])

  return (
    <Context>
      <Head />
      <h1>Contacts</h1>
      <List items={contacts} />
      <List items={favorites} />
    </Context>
  )
}
