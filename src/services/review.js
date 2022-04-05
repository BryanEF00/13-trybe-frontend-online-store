const REVIEW = 'review';

if (!JSON.parse(localStorage.getItem(REVIEW))) {
  localStorage.setItem(REVIEW, JSON.stringify([]));
}

export const readCustomerReview = () => JSON.parse(localStorage.getItem(REVIEW));

export const saveCustomerReview = (review) => localStorage
  .setItem(REVIEW, JSON.stringify(review));
