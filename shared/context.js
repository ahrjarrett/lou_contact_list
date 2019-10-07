import { createContext } from 'react'
import { path } from 'ramda'

import styles from '../shared/styles'
import data from '../shared/seedData'

export const Styles = createContext(styles)
export const Data = createContext(data)

export const StylesProvider = Styles.Provider
export const DataProvider = Data.Provider

export default function Context({ children }) {
  return (
    <StylesProvider value={styles}>
      <DataProvider value={data}>{children}</DataProvider>
    </StylesProvider>
  )
}
