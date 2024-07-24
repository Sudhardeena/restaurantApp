import React from 'react'

const MenuDetailsContext = React.createContext({
  resturentMenuDetails: {},
  addItem: () => {},
  removeItem: () => {},
})

export default MenuDetailsContext
