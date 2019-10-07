import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import * as R from 'ramda'

import ContactItem from '../components/ContactItem'
import Directory from '../components/Directory'
import Context, { Data, Styles } from '../shared/context'
import { getEntities } from '../shared/utils'

export default function Index() {
  const data = useContext(Data)
  const styles = useContext(Styles)
  const { contacts, groups } = getEntities()

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
