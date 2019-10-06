import * as R from 'ramda'

const listWrapper = {
  display: 'flex',
  flexWrap: 'wrap',
  border: '1px solid blue',
  width: 400,
}

const home = {
  display: 'flex',
  flexDirection: 'column',
}

const list = {
  width: 400,
  marginLeft: 15,
  marginRight: 15,
}

const lists = {}

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
  home,
  listWrapper,
  list,
  lists,
}
