import React, { Component } from 'react';
import CardProduct from '../components/CardProduct';
import Categories from '../components/Categories';
import CartButton from '../components/CartButton';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { readShoppingCart } from '../services/cart';
import { readCustomerReview } from '../services/review';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      //  começa valendo 1 para não renderizar o <p>Nenhum produto foi encontrado</p>
      products: [1],
      category: '',
      searchValue: '',
    };
  }

  componentDidMount() {
    readShoppingCart();
    readCustomerReview();
  }

  handleChange = ({ target }) => {
    const { value } = target;

    this.setState({
      searchValue: value,
    });
  }

  handleClick = async () => {
    const { searchValue, category } = this.state;
    const response = await getProductsFromCategoryAndQuery(category, searchValue);
    this.setState({
      products: response.results,
    }, () => {
      this.setState({ searchValue: '' });
    });
  }

  displayProductsByCategory = (categoryProducts, id) => {
    this.setState((prevState) => ({
      products: categoryProducts,
      category: prevState.category === id ? '' : id }));
  }

  render() {
    const { searchValue, products, category } = this.state;

    return (
      <div className="home">
        <div
          className="d-flex justify-content-around
        header align-items-center shadow mb-4 bg-primary bg-gradient"
        >
          <div className="d-flex">
            <input
              onChange={ this.handleChange }
              type="text"
              className="input-search form-control me-2 "
              placeholder="Pesquisar"
              data-testid="query-input"
              value={ searchValue }
            />
            <button
              onClick={ this.handleClick }
              type="button"
              className="btn btn-light"
              data-testid="query-button"
            >
              Search
            </button>
          </div>
          <CartButton />
        </div>
        <div className="main d-flex">
          <Categories
            displayProductsByCategory={ this.displayProductsByCategory }
            categoryId={ category }
          />
          <div className="container">
            <p
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
            <div className="listItems d-flex flex-wrap">
              { products.length === 0 && <p> Nenhum produto foi encontrado</p>}
              {
                products.length > 1 && products.map((element) => (<CardProduct
                  key={ element.id }
                  data={ element }
                />))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
