import './App.css'
import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Cart from './components/Cart'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = cartItemDetails => {
    const {cartList} = this.state
    const {dishId, quantity} = cartItemDetails
    const presentStatus = cartList.find(el => el.dishId === dishId)
    if (presentStatus !== undefined) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(cartItem => {
          if (cartItem.dishId === dishId) {
            return {...cartItemDetails, quantity: cartItem.quantity + quantity}
          }
          return cartItem
        }),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, cartItemDetails],
      }))
    }
  }

  incrementCartItemQuantity = dishId =>
    this.setState(prevState => ({
      cartList: prevState.cartList.map(el => {
        if (el.dishId === dishId) {
          return {...el, quantity: el.quantity + 1}
        }
        return el
      }),
    }))

  // remove cart item whose quantity is less than 1
  removeCartItem = dishId =>
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.dishId !== dishId),
    }))

  // remove cart item
  removeCartItemQntyLessThnOne = () =>
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.quantity > 0),
    }))

  // removing dish quantity
  decrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(el => {
        if (el.dishId === dishId) {
          return {...el, quantity: el.quantity - 1}
        }
        return el
      }),
    }))
    this.removeCartItemQntyLessThnOne()
  }

  removeAllCartItems = () => this.setState({cartList: []})

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
