import {Link, withRouter} from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        return (
          <div className="header-div">
            <Link className="link" to="/">
              <h1 className="restaurant-name">UNI Resto Cafe</h1>
            </Link>
            <div className="cart-div">
              <span className="my-orders-text">My Orders</span>
              <Link className="link" to="/cart">
                <button
                  className="cart-icon-count-button"
                  type="button"
                  data-testid="cart"
                >
                  <AiOutlineShoppingCart className="cart-icon" />
                  <span className="cart-count">{cartList.length}</span>
                </button>
              </Link>
              <button
                type="button"
                className="logout-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
