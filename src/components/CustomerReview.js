import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { readCustomerReview, saveCustomerReview } from '../services/review';
import Rating from './Rating';
import Review from './Review';

class CustomerReview extends Component {
  constructor() {
    super();

    this.state = {
      reviewList: [],
    };
  }

  componentDidMount() {
    const { productID } = this.props;

    const getReviews = readCustomerReview();

    const newReview = { id: productID, review: [] };
    const hasId = getReviews.some((review) => review.id === productID);

    if (!hasId) {
      getReviews.push(newReview);
    }

    saveCustomerReview(getReviews);
    this.addReview();
  }

  addReview = () => {
    const { productID } = this.props;
    const matchID = readCustomerReview().find((review) => review.id === productID);

    this.setState({ reviewList: matchID });
  }

  render() {
    const { reviewList } = this.state;
    const { productID } = this.props;

    return (
      <div>
        <h3 className="text-start px-3">Avaliações</h3>
        <Rating
          productID={ productID }
          addReview={ this.addReview }
        />
        <Review reviewList={ reviewList.review } />
      </div>
    );
  }
}

CustomerReview.propTypes = {
  productID: PropTypes.string.isRequired,
};

export default CustomerReview;
