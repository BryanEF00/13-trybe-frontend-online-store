import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CardProduct extends Component {
  render() {
    const { data } = this.props;
    const { title, price, thumbnail_id: thumbnailId, id } = data; // camelCase erro LINT
    const url = `https://http2.mlstatic.com/D_NQ_NP_${thumbnailId}-O.webp`;
    return (
      <div data-testid="product">
        <Link data-testid="product-detail-link" to={ `/product/${id}` }>
          <div>
            <h1>{ title }</h1>
            <img src={ url } alt={ title } />
            <p>{ price }</p>
          </div>
        </Link>
      </div>
    );
  }
}

CardProduct.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    thumbnail_id: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,

};

export default CardProduct;
