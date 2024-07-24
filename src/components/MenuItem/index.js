import MenuDetailsContext from '../../context/MenuDetailsContext'
import './index.css'

const MenuItem = props => {
  const {menuDetails} = props
  const {
    dishName,
    dishId,
    dishPrice,
    dishCurrency,
    dishDescription,
    quantity,
    addonCat,
    dishAvailability,
    dishCalories,
    dishImage,
  } = menuDetails
  const customizationAvailable = addonCat.length > 0
  const dishTypeImgUrl =
    menuDetails.dishType === 2
      ? 'https://i.ibb.co/K7Nt2zy/icons8-vegetarian-food-symbol-48.png'
      : 'https://i.ibb.co/T2h97p7/icons8-non-veg-48.png'

  return (
    <MenuDetailsContext.Consumer>
      {value => {
        const {addItem, removeItem} = value
        const onAdd = () => addItem(dishId)
        const onRemove = () => removeItem(dishId)
        return (
          <li className="menu-item">
            <div className="menu-info-div">
              <img
                className="dish-type-img"
                src={dishTypeImgUrl}
                alt="icons8-non-veg-48"
                border="0"
              />
              <div className="menu-info">
                <h1 className="dish-name">{dishName}</h1>
                <p className="price">
                  {dishCurrency} {dishPrice}
                </p>
                <p className="dish-desc">{dishDescription}</p>
                {dishAvailability ? (
                  <div className="inc-desc-buttons-div">
                    <button
                      className="btn decrease-btn"
                      type="button"
                      onClick={onRemove}
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      className="btn increase-btn"
                      type="button"
                      onClick={onAdd}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <p className="not-available-text">Not available</p>
                )}

                {customizationAvailable && (
                  <p className="customizationAvailable-text">
                    Customizations available
                  </p>
                )}
              </div>
            </div>
            <p className="calories">{dishCalories} calories</p>
            <div>
              <img className="dish-img" src={dishImage} alt={dishName} />
            </div>
          </li>
        )
      }}
    </MenuDetailsContext.Consumer>
  )
}

export default MenuItem
