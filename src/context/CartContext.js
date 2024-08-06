import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  removeCartItem: () => {},
  removeAllCartItems: () => {},
  addCartItem: () => {},
})

export default CartContext
