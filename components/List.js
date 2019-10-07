import React, { useContext, useEffect, useState } from 'react'
import * as R from 'ramda'

export function reducer(state, { type, payload }) {
  switch (type) {
    case 'TOGGLE_FAVORITE': {
      return { ...state, [payload]: !state[payload] }
    }
    default:
      return state
  }
}

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

export default function List({
  heading,
  items,
  group,
  handleClick,
  favorites,
  requiredProp,
}) {
  const styles = useContext(Styles)

  return (
    <div style={styles.list}>
      {heading && items.length > 0 && <h1>{heading}</h1>}
      {items.map(item => (
        <ContactItem
          {...item}
          key={item.id}
          handleClick={handleClick}
          favorite={favorites[item.id]}
        />
      ))}
    </div>
  )
}
