/* eslint-disable arrow-body-style */
import { rest } from 'msw';

const testProduct = {
  id: 11,
  name: 'Air Minis 250',
  slogan: 'Full court support',
  description: 'This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.',
  category: 'Basketball Shoes',
  default_price: '0',
  features: [
    {
      feature: 'Sole',
      value: 'Rubber',
    },
    {
      feature: 'Material',
      value: 'FullControlSkin',
    },
  ],
};

const testMetadata = {
  product_id: '2',
  ratings: {
    2: 1,
    3: 1,
    4: 2,
    // ...
  },
  recommended: {
    0: 5,
  },
  characteristics: {
    Size: {
      id: 14,
      value: '4.0000',
    },
    Width: {
      id: 15,
      value: '3.5000',
    },
    Comfort: {
      id: 16,
      value: '4.0000',
    },
  },
};

const handlers = [
  // eslint-disable-next-line arrow-body-style
  rest.get('/api/shared/products/', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(testProduct),
    );
  }),
  rest.get('/api/reviews/meta', (req, res, ctx) => {
    const query = req.url.searchParams;
    const product_id = query.get('product_id');
    return res(
      ctx.status(200),
      ctx.json(testMetadata),
    );
  }),
];

export default handlers;
