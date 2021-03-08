/* eslint-disable import/extensions */
import React, { useState } from 'react';
import ProductInformation from './ProductInformation.jsx';
import ProductDescription from './ProductDescription.jsx';
import ImageGallery from './ImageGallery.jsx';
import StyleSelector from './StyleSelector.jsx';
import Banner from './Banner.jsx';

export default function Overview({
  product,
  selectedItemIndex,
  avgRating
}) {
  const [selectedStyle, selectStyle] = useState(0);
  const [price, updatePrice] = useState(0);
  const [sale, updateSale] = useState(null);
  const [photos, updatePhotos] = useState([]);
  const [selectedPhoto, selectPhoto] = useState('');

  return (
    <div>
      <Banner />
      {product
        ? (
          <div className="overview">
            <ImageGallery selectedPhoto={selectedPhoto} selectPhoto={selectPhoto} photos={photos} />
            <div className="right-side">
              <ProductInformation
                product={product}
                selectedStyle={selectedStyle}
                price={price}
                sale={sale}
                avgRating={avgRating}
              />
              <StyleSelector
                product={product}
                selectedStyle={selectedStyle}
                selectStyle={selectStyle}
                updatePrice={updatePrice}
                updateSale={updateSale}
                selectPhoto={selectPhoto}
                updatePhotos={updatePhotos}
              />
            </div>
          </div>
        )
        : null}
      <ProductDescription product={product} />
    </div>
  );
}
