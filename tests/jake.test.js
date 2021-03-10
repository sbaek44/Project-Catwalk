import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, fireEvent, waitFor, screen, getByText, toBeInTheDocument
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Overview from '../react-client/src/components/product-overview/tests/Overview.test.jsx';
import handlers from './msw/handlers.js';
import axios from 'axios';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const fetch = () => {
  return axios.get(`/api/shared/products/`)
    .then((data) => {
      return data.data
    })
    .catch((err) => {
      console.log(err);
    });
}

test('it does a get request and passes it to a component', async () => {
  const product = await fetch();
  expect(product.name).toEqual('Air Minis 250');
  const { container, getByText } = render(<Overview product={product} />);
})

test('it renders a shallow copy of the component which does its own get request', async () => {
  const { container, getByText } = render(<Overview />);
  await waitFor(() => {
    expect(getByText('Air Minis 250')).toBeInTheDocument();
    expect(getByText('Full court support')).toBeInTheDocument()
  })
})