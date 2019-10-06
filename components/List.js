import React, { useContext, useEffect, useState } from 'react'
import * as R from 'ramda'

import ContactItem from '../components/ContactItem'
import { Styles } from '../shared/context'

// Render a list of contacts alphabetically by last name, first name.
// The list should be broken up into sections where each section has a title of the first letter of the last names of contacts in that section.
// Contacts without a phone number should be ignored.
// Phone numbers should be displayed in a (xxx) xxx-xxxx format.
// Ex.
// J
// –––––––
// Richard Julian – (542) 211-5678
//
// L
// –––––––
// Alejandro Lane – (542) 345-8721
// Allen Lane – (542) 987-3456
// Bob Larson – (542) 321-3456
// .....

function Group({ group, styles }) {
  return <p style={styles.group}>{group}</p>
}

export default function List({ heading, items, group, handleClick }) {
  const styles = useContext(Styles)

  return (
    <div style={styles.list}>
      {heading && <h1>{heading}</h1>}
      {items.map(item => (
        <ContactItem {...item} key={item.id} handleClick={handleClick} />
      ))}
    </div>
  )
}
