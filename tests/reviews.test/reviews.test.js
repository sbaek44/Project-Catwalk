import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, getByPlaceholderText, waitFor, screen, getByText, getByRole,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import handlers from '../msw/handlers.js';
import ReviewsTest from '../../react-client/src/components/Reviews/ReviewsTest.jsx';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('it should render a review after interacting with an api', async () => {
  render(<ReviewsTest />)
  await waitFor(() => {
    expect(screen.findByText(/comfortable/i)).toBeInTheDocument();
    screen.debug()
  })
});
