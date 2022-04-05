import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FaStar } from 'react-icons/fa';

class Review extends Component {
  render() {
    const { reviewList } = this.props;
    const stars = 5;

    return (
      <div>
        {reviewList
        && reviewList.map((review, index) => (
          <div
            className="border p-4"
            key={ index }
          >
            <div className="row mb-3">
              <div className="col text-start">{review.email}</div>
              <div className="col">
                {
                  [...Array(stars)].map((star, indexStar) => {
                    const ratingValue = indexStar + 1;

                    return (
                      <FaStar
                        className="fs-4 ps-1"
                        key={ ratingValue }
                        color={ ratingValue <= review.rating ? '#ffc107' : '#e4e5e9' }
                      />
                    );
                  })
                }

              </div>
            </div>
            <div className="text-start px-4">{review.evaluation}</div>
          </div>
        )) }
      </div>
    );
  }
}

Review.defaultProps = {
  reviewList: [],
};

Review.propTypes = {
  reviewList: PropTypes.arrayOf(PropTypes.object),
};

export default Review;
