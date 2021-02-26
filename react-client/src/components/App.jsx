import React from 'react';
import axios from 'axios';
import header from '../../../config.js'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allProducts: [],
      selectedItemIndex: 0,
      relatedItems: []
    }
    this.getProducts = this.getProducts.bind(this);
    this.selectProduct = this.selectProduct.bind(this);
    this.getRelatedItems = this.getRelatedItems.bind(this);
  }
  componentDidMount() {
    this.getProducts();
  }

  selectProduct(index) {
    this.setState({
      selectedItemIndex: index
    })
  }

  getRelatedItems() {
    let id = this.state.allProducts[this.state.selectedItemIndex].id
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${id}/related`, header)
      .then((data) => {
        this.setState({
          relatedItems: data.data
        }, () => console.log(this.state))
      })
      .catch((err) => console.log(err))
  }

  getProducts() {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products?count=10&page=5', header)
      .then((data) => {
        this.setState({
          allProducts: data.data
        })
      })
      .then(() => this.getRelatedItems())
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>React</div>
    )
  }
}