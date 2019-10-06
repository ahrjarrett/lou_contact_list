import React, { useContext } from 'react'
import * as R from 'ramda'

import ContactItem from '../components/ContactItem'
import { Data, Styles } from '../shared/context'

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

export default function ContactList() {
  const styles = useContext(Styles)
  const { contacts } = useContext(Data)
  const directory = R.identity(contacts)

  return (
    <div style={styles.contactList}>
      {directory.map((contact, idx) => (
        <ContactItem key={idx} {...contact} />
      ))}
    </div>
  )
}
