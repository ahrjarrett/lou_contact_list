import React, { useCallback, useContext, useEffect } from 'react'

import { Styles } from '../shared/context'

export default function ContactItem({
  id,
  firstName,
  lastName,
  phone,
  favorite,
  handleClick,
  ...props
}) {
  useEffect(() => {
    console.log('reinder')

    //console.log('DEBUG::\n\n\nstate\n', state)
  })
  const styles = useContext(Styles)

  const handler = useCallback(handleClick(id))

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
