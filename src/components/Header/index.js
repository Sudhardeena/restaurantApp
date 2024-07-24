import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'

const Header = props => {
  const {restaurantName, total} = props
  return (
    <div className="header-div">
      <h1 className="restaurant-name">{restaurantName}</h1>
      <div className="cart-div">
        <span className="my-orders-text">My Orders</span>
        <div className="cart-icon-count-div">
          <AiOutlineShoppingCart className="cart-icon" />
          <span className="cart-count">{total}</span>
        </div>
      </div>
    </div>
  )
}

export default Header
