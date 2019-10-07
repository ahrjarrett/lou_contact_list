import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as R from 'ramda'

import makeSeedData from '../shared/seedData'

import ContactItem from '../components/ContactItem'
import Directory from '../components/Directory'
import Context from '../shared/context'

export default function Index() {
  const router = useRouter()
  console.log(router)

  useEffect(() => {
    document.title = 'Contacts'
  }, [])

  return (
    <Context>
      <div>
        <Head />
        <Directory />
      </div>
    </Context>
  )
}
