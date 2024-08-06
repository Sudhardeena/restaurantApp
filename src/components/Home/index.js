import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Tablist from '../Tablist'
import MenuList from '../MenuList'
import MenuDetailsContext from '../../context/MenuDetailsContext'

import './index.css'

// write your code here

// Top level component in tree
class Home extends Component {
  // keeping initial data in state object is going to change in the future
  state = {
    isLoading: true,
    activeTab: '',
    resturentMenuDetails: {},
  }

  // calling after initial render to make a API CALL
  componentDidMount() {
    this.getMenudetails()
  }

  // to display loading while fetching the data
  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // function to make API CALL and get the Menu details
  getMenudetails = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(url)
    const menudetatils = await response.json()
    console.log(menudetatils)
    const menudetatil = menudetatils[0]
    // console.log(menudetatil)
    const modifiedData = {
      restaurantName: menudetatil.restaurant_name,
      restaurantId: menudetatil.restaurant_id,
      tableMenuList: menudetatil.table_menu_list.map(each => ({
        categoryDishes: each.category_dishes.map(el => ({
          addonCat: el.addonCat,
          dishAvailability: el.dish_Availability,
          dishType: el.dish_Type,
          dishCalories: el.dish_calories,
          dishCurrency: el.dish_currency,
          dishDescription: el.dish_description,
          dishId: el.dish_id,
          dishImage: el.dish_image,
          dishName: el.dish_name,
          dishPrice: el.dish_price,
          quantity: parseInt(0),
        })),
        menuCategory: each.menu_category,
        menuCategoryId: each.menu_category_id,
      })),
    }
    // console.log(modifiedData)
    const firstMenuCategory = modifiedData.tableMenuList[0].menuCategory
    // console.log(firstMenuCategory)
    this.setState({
      resturentMenuDetails: modifiedData,
      activeTab: firstMenuCategory,
      isLoading: false,
    })
  }

  // changing active menu category
  changeActiveTab = clickedTab => this.setState({activeTab: clickedTab})

  // displaying the menu categories
  renderTabList = () => {
    const {resturentMenuDetails, activeTab} = this.state
    const tabList = resturentMenuDetails.tableMenuList.map(each => ({
      menuCategory: each.menuCategory,
      menuCategoryId: each.menuCategoryId,
    }))
    return (
      <Tablist
        tabList={tabList}
        activeTab={activeTab}
        changeActiveTab={this.changeActiveTab}
      />
    )
  }

  // rendering filtered dishes based on menu category
  renderMenuList = () => {
    const {resturentMenuDetails, activeTab} = this.state
    const menulist = resturentMenuDetails.tableMenuList.find(
      each => each.menuCategory === activeTab,
    )
    const filteredList = menulist.categoryDishes
    // console.log(filteredList)
    return <MenuList menulist={filteredList} />
  }

  // rendering Header with cart dishes count
  renderHeader = () => <Header />

  // adding dish quantity
  addItem = dishId => {
    const {resturentMenuDetails} = this.state
    this.setState({
      resturentMenuDetails: {
        restaurantId: resturentMenuDetails.restaurantId,
        restaurantName: resturentMenuDetails.restaurantName,
        tableMenuList: resturentMenuDetails.tableMenuList.map(each => ({
          categoryDishes: each.categoryDishes.map(el => {
            if (el.dishId === dishId) {
              return {...el, quantity: el.quantity + 1}
            }
            return el
          }),
          menuCategory: each.menuCategory,
          menuCategoryId: each.menuCategoryId,
        })),
      },
    })
  }

  // removing dish quantity
  removeItem = dishId => {
    const {resturentMenuDetails} = this.state
    this.setState({
      resturentMenuDetails: {
        restaurantId: resturentMenuDetails.restaurantId,
        restaurantName: resturentMenuDetails.restaurantName,
        tableMenuList: resturentMenuDetails.tableMenuList.map(each => ({
          categoryDishes: each.categoryDishes.map(el => {
            if (el.dishId === dishId) {
              if (el.quantity > 0) {
                return {...el, quantity: el.quantity - 1}
              }
              return el
            }
            return el
          }),
          menuCategory: each.menuCategory,
          menuCategoryId: each.menuCategoryId,
        })),
      },
    })
  }

  // rendering possible views
  render() {
    const {isLoading, resturentMenuDetails} = this.state
    return (
      <MenuDetailsContext.Provider
        value={{
          resturentMenuDetails,
          addItem: this.addItem,
          removeItem: this.removeItem,
        }}
      >
        <div className="page-container">
          {isLoading === false ? (
            <>
              {this.renderHeader()}
              {this.renderTabList()}
              {this.renderMenuList()}
            </>
          ) : (
            this.renderLoadingView()
          )}
        </div>
      </MenuDetailsContext.Provider>
    )
  }
}

export default Home
