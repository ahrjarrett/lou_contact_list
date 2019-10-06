import React, { useContext } from 'react'

import { Styles } from '../shared/context'

export default function ContactItem({
  firstName,
  lastName,
  phone,
  handleClick,
  group,
  id,
  favorite,
}) {
  const [fav, setFav] = React.useState(favorite)
  const styles = useContext(Styles)
  //const handleClick = e => {
  //  console.log('calling handleClick', e)
  //  console.log('DEBUG::\n\n\nfav\n', fav)

  //  setFav(!fav)
  //}

  const handler = handleClick(id)

  return (
    <div style={styles.contactItem}>
      <button
        onClick={handler}
        style={{ backgroundColor: fav ? 'red' : 'inherit' }}
      >
        {'<3'}
      </button>
      <p>
        {firstName} <strong>{lastName}</strong>
      </p>
      <p>{phone}</p>
    </div>
  )
}
