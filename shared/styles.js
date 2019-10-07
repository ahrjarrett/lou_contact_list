import * as R from 'ramda'

const listWrapper = {
  display: 'flex',
  flexWrap: 'wrap',
}

const list = {
  width: 400,
  marginLeft: 15,
  marginRight: 15,
}

const contactItem = {
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid #eee',
}

const group = {
  fontSize: 32,
  margin: 0,
  marginTop: 16,
  textAlign: 'right',
  borderBottom: '1px solid #ccc',
}

export default {
  contactItem,
  group,
  listWrapper,
  list,
}
