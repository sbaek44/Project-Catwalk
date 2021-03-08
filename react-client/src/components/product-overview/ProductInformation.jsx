/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-prototype-builtins */
/* eslint-disable import/extensions */
import React from 'react';
import { SocialIcon } from 'react-social-icons';
import PropTypes from 'prop-types';
import Stars from '../Reviews/Ratings/Stars.jsx';

function ProductInformation({
  product,
  price,
  sale,
  avgRating,
}) {
  const renderPrice = () => {
    if (sale) {
      return (
        <span>
          <span className="price" style={{ color: 'red' }}>
            $
            {sale}
          </span>
          <span className="price" style={{ textDecoration: 'line-through' }}>
            {' '}
            {price}
          </span>
        </span>
      );
    }
    return (
      <span className="price">
        $
        {price}
      </span>
    );
  };

  const renderSocialMediaIcons = () => (
    <div className="social-media-links">
      <SocialIcon style={{ marginRight: 2, height: '2rem', width: '2rem' }} url="http://facebook.com" />
      <SocialIcon style={{ marginRight: 2, height: '2rem', width: '2rem' }} url="http://twitter.com" />
      <SocialIcon style={{ marginRight: 2, height: '2rem', width: '2rem' }} url="http://pinterest.com" />
    </div>
  );

  const scrollToReviews = () => {
    document.querySelector('.reviews-list').scrollIntoView({
      behavior: 'smooth',
    });
  };

  const uppercase = (str = '') => (str.toUpperCase());

  return (
    <div>
      {product.hasOwnProperty('id')
        ? (
          <div className="product-info-side">
            <div className="product-rating">
              <Stars avgRating={avgRating} />
              <span id="reviews-link" onClick={() => scrollToReviews()}>Read all reviews</span>
            </div>
            <div className="product-category">
              {uppercase(product.category)}
            </div>
            <div className="product-name">
              {product.name}
            </div>
            <div className="product-price">{renderPrice()}</div>
            {renderSocialMediaIcons()}
          </div>
        )
        : null}
    </div>
  );
}

ProductInformation.propTypes = {
  product: PropTypes.object,
  price: PropTypes.number,
  sale: PropTypes.number,
  avgRating: PropTypes.number,
};

ProductInformation.defaultProps = {
  product: {},
  price: null,
  sale: null,
  avgRating: null,
};

export default ProductInformation;
