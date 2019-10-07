import React, { useContext } from 'react'

import { Styles } from '../shared/context'

export default function ContactItem({
  id,
  firstName,
  lastName,
  phone,
  favorite,
  handleClick,
}) {
  const styles = useContext(Styles)

  const handler = handleClick(id)

  return (
    <div style={styles.contactItem}>
      <div style={{ display: 'flex' }}>
        <button
          style={{ backgroundColor: favorite ? 'red' : '#eee' }}
          onClick={handler}
        >
          {'<3'}
        </button>
        <p>
          {firstName} <strong>{lastName}</strong>
        </p>
      </div>
      <p>{phone}</p>
    </div>
  )
}
