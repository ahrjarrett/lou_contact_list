import React, { useContext } from 'react'

import { Styles } from '../shared/context'

export default function ContactItem({ firstName, lastName, phone }) {
  const styles = useContext(Styles)

  return (
    <div style={styles.contactItem}>
      <p>
        {firstName} <strong>{lastName}</strong>
      </p>
      <p>{phone}</p>
    </div>
  )
}
