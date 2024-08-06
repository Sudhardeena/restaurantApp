import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => {
  const {menuDetails} = props
  const {
    dishName,
    dishId,
    dishPrice,
    dishCurrency,
    quantity,
    dishImage,
  } = menuDetails
  const dishTypeImgUrl =
    menuDetails.dishType === 2
      ? 'https://i.ibb.co/K7Nt2zy/icons8-vegetarian-food-symbol-48.png'
      : 'https://i.ibb.co/T2h97p7/icons8-non-veg-48.png'

  return (
    <CartContext.Consumer>
      {value => {
        const {
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeCartItem,
        } = value
        const onAIncrease = () => incrementCartItemQuantity(dishId)
        const onReduce = () => decrementCartItemQuantity(dishId)
        const onRemove = () => removeCartItem(dishId)

        return (
          <li className="cart-item">
            <div>
              <img className="dish-img" src={dishImage} alt={dishName} />
            </div>
            <div className="cart-info-div">
              <img
                className="dish-type-img"
                src={dishTypeImgUrl}
                alt="icons8-non-veg-48"
                border="0"
              />
              <div className="cart-info">
                <h1 className="dish-name">{dishName}</h1>
                <div className="inc-desc-buttons-div">
                  <button
                    className="btn decrease-btn"
                    type="button"
                    onClick={onReduce}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    className="btn increase-btn"
                    type="button"
                    onClick={onAIncrease}
                  >
                    +
                  </button>
                </div>
                <p className="price">
                  {dishCurrency} {dishPrice * quantity}
                </p>
              </div>
            </div>
            <button
              className="delete-button"
              type="button"
              aria-label="fillCloseCircle"
              onClick={onRemove}
            >
              <AiFillCloseCircle color="#616E7C" size={20} />
            </button>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
// {customizationAvailable && (
//   <p className="customizationAvailable-text">
//     Customizations available
//   </p>
// )}
