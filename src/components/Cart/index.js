import Header from '../Header'
import CartList from '../CartList'
import EmptyCartView from '../EmptyCartView'
import CartContext from '../../context/CartContext'

import './index.css'

// write your code here

// Top level component in tree
const Cart = () => {
  const renderMenuList = cartList => <CartList menulist={cartList} />

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, removeAllCartItems} = value
        const onClearCart = () => removeAllCartItems()
        const cartCount = cartList.length
        return (
          <div className="page-container">
            <Header />

            {cartCount > 0 ? (
              <>
                <button
                  type="button"
                  className="remove-all-btn"
                  onClick={onClearCart}
                >
                  Remove All
                </button>
                {renderMenuList(cartList)}
              </>
            ) : (
              <EmptyCartView />
            )}
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Cart
