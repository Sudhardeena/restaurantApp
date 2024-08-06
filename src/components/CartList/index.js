import CartItem from '../CartItem'
import './index.css'

const CartList = props => {
  const {menulist} = props
  // console.log(menulist)

  return (
    <ul className="cart-list">
      {menulist.map(each => (
        <CartItem menuDetails={each} />
      ))}
    </ul>
  )
}

export default CartList
// <a target="_blank" href="https://icons8.com/icon/61083/vegetarian-food-symbol">Vegetarian Food Symbol</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
