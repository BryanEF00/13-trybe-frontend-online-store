import PropTypes from 'prop-types';
import React from 'react';
import AddToCartDetailed from '../components/AddToCartDetailed';
import CartButton from '../components/CartButton';
import CustomerReview from '../components/CustomerReview';
import ProductAttributes from '../components/ProductAttributes';
import { getProductById } from '../services/api';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      shippingFreeState: false,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const productInfo = await getProductById(id);
    const { shipping } = productInfo;
    const { free_shipping: freeShipping } = shipping;
    this.setState({
      details: productInfo,
      shippingFreeState: freeShipping,
    });
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const { details: {
      title,
      attributes,
      price,
      thumbnail_id: thumbnailId } } = this.state;
    const { details } = this.state;
    const { shippingFreeState } = this.state;

    return (
      <div className="d-flex p-2">
        <div className="p-2">
          <h4 data-testid="product-detail-name">{ title }</h4>
          <img src={ `https://http2.mlstatic.com/D_NQ_NP_${thumbnailId}-O.webp` } alt={ title } />
          <p>{`R$${price}`}</p>
          { shippingFreeState === true
          && <p data-testid="free-shipping" className="text-success">Frete Grátis</p> }
          <CartButton />
          <AddToCartDetailed details={ details } />
          <CustomerReview productID={ id } />
        </div>
        { !attributes ? <p>Carregando...</p>
          : (
            <div className="p-2">
              {attributes.map((elem) => elem.value_name !== null && <ProductAttributes
                key={ elem.id }
                data={ elem }
              />)}
            </div>
          )}
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductDetail;
