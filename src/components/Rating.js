import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FaStar } from 'react-icons/fa';
import { readCustomerReview, saveCustomerReview } from '../services/review';

// Referência: https://www.youtube.com/watch?v=eDw46GYAIDQ

class Rating extends Component {
  constructor() {
    super();

    this.state = {
      rating: null,
      hover: null,
      email: '',
      evaluation: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { productID, addReview } = this.props;
    const { rating, email, evaluation } = this.state;
    const getReviews = readCustomerReview().map((item) => {
      if (item.id === productID) {
        const newReview = { email, rating, evaluation };
        item.review.push(newReview);
      }
      return item;
    });

    saveCustomerReview(getReviews);
    addReview();

    this.setState({
      rating: null,
      hover: null,
      email: '',
      evaluation: '',
    });
  }

  render() {
    const { rating, hover, email, evaluation } = this.state;
    const stars = 5;

    return (
      <div className="container border p-4">
        <div className="row align-items-center pb-3 mx-auto">
          <input
            data-testid="product-detail-email"
            className="col form-control"
            type="email"
            placeholder="Email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <div className="rating col-auto">
            {[...Array(stars)].map((star, index) => {
              const ratingValue = index + 1;

              return (
                <label
                  key={ ratingValue }
                  htmlFor={ ratingValue }
                >
                  <input
                    type="radio"
                    id={ ratingValue }
                    value={ ratingValue }
                    onClick={ () => this.setState({ rating: ratingValue }) }
                  />
                  <FaStar
                    data-testid={ `${ratingValue}-rating` }
                    className="star fs-4 ps-1"
                    onMouseEnter={ () => this.setState({ hover: ratingValue }) }
                    onMouseLeave={ () => this.setState({ hover: null }) }
                    color={ ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9' }
                  />
                </label>
              );
            })}
          </div>
        </div>
        <textarea
          data-testid="product-detail-evaluation"
          className="row form-control mb-3 mx-auto"
          placeholder="Mensagem (opcional)"
          name="evaluation"
          value={ evaluation }
          onChange={ this.handleChange }
        />
        <button
          data-testid="submit-review-btn"
          className="btn btn-primary px-5"
          type="submit"
          onClick={ this.handleSubmit }
        >
          Avaliar
        </button>
      </div>
    );
  }
}

Rating.propTypes = {
  productID: PropTypes.string.isRequired,
  addReview: PropTypes.func.isRequired,
};

export default Rating;
