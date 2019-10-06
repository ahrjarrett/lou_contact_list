import React, { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'

import ContactList from '../components/ContactList'
import Context from '../shared/context'

export default function Index() {
  useEffect(() => {
    document.title = 'Contacts'
  }, [])

  return (
    <Context>
      <Head />
      <h1>Contacts</h1>
      <ContactList />
    </Context>
  )
}
