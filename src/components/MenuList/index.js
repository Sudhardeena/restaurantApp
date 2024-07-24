import MenuItem from '../MenuItem'
import './index.css'

const MenuList = props => {
  const {menulist} = props
  console.log(menulist)

  return (
    <ul className="menu-list">
      {menulist.map(each => (
        <MenuItem menuDetails={each} />
      ))}
    </ul>
  )
}

export default MenuList
// <a target="_blank" href="https://icons8.com/icon/61083/vegetarian-food-symbol">Vegetarian Food Symbol</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
