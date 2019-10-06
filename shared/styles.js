import * as R from 'ramda'

const mediaQuery = R.pipe(
  R.tap(console.log),
  x => {
    if (x >= 1200) return 'desktop'
    if (x >= 768) return 'tablet'
    else return 'phone'
  },
  R.tap(console.log),
)

//const mediaQuery = x => ({ display: 'flex' })
//const mediaQuery = R.cond([
//  [R.gte(1200), R.always('desktop')],
//  [R.gte(768), R.always('tablet')],
//  [R.always('phone')],
//])

const mediaQueries = {
  desktop: 1200,
  tablet: 768,
}

const listWrapper = screenX => {
  const device = mediaQuery(screenX)

  return {
    //transition: 'width 2s',
    //transform:
    width: device == 'phone' ? '100%' : '50%',
  }
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

const List = {
  display: 'flex',
  flexWrap: 'wrap',
}

const contactItem = {
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid #eee',
}

export default {
  home,
  contactItem,
  listWrapper,
  list,
  List,
}
