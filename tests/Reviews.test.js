import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, fireEvent, waitFor, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Reviews from '../react-client/src/components/Reviews/Reviews';
import handlers from './msw/handlers.js';
import axios from 'axios'

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('it should render a review title', async () => {
  const reviews = await axios.get('/api/reviews').then((data) => data.data)
  console.log(reviews);
  expect(reviews).toBeTruthy()

})