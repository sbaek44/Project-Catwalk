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

const mockGetRatings = jest.fn();
test('it should render a review after interacting with an api', async () => {
  const metadata = await axios.get('/api/reviews/meta').then(data => data.data);
  const { getByText } = render(<ReviewsTest avgRating={3.75} metadata={metadata} getRatings={mockGetRatings} currentProduct={{id: 5}} />)
  await waitFor(() => {
    expect(getByText(/comfortable/i)).toBeInTheDocument();
  });
});

test('it should only display items that are being searched', async () => {
  const metadata = await axios.get('/api/reviews/meta').then(data => data.data);
  const { getByText } = render(<ReviewsTest avgRating={3.75} metadata={metadata} getRatings={mockGetRatings} currentProduct={{id: 5}} />)
  await waitFor(() => {
    expect(getByText(/They are very dark. But that's good because I'm in very sunny spots/i)).toBeInTheDocument();
    expect(getByText(/Comfortable and practical./i)).toBeInTheDocument();
  });
  const input = screen.getByPlaceholderText('search..');
  userEvent.type(input, 'dark');
  await waitFor(() => {
    // screen.debug(null, 20000)
    expect(screen.queryByText(/comfortable/i)).toBeNull();
    expect(getByText(/dark/i)).toBeInTheDocument();
  });
})

test('it should be able to post a review to the database', async () => {
  jest.spyOn(Alert, 'alert');
  const metadata = await axios.get('/api/reviews/meta').then(data => data.data);
  const { getByText, getByPlaceholderText } = render(<ReviewsTest avgRating={3.75} metadata={metadata} getRatings={mockGetRatings} currentProduct={{id: 5}} />)
  const addReviewButton = getByText(/add a review/i);
  userEvent.click(addReviewButton);
  userEvent.selectOptions(screen.getByTestId('ratings'), ['1']);
  userEvent.selectOptions(screen.getByTestId('recommend'), ['false']);
  userEvent.Type(screen.getByLabel('Review summary:'), 'fast, efficient and cheap!');
  userEvent.Type(screen.getByLabel('Review body:'), 'lorem etsum ipsum dolor pain so much pain yadayadayadayadayadayadyadyady');
  userEvent.Type(screen.getByLabel('Review summary:'), 'fast, efficient and cheap!');
  userEvent.Type(screen.getByLabel('What is your nickname?:'), 'react testing lib');
  userEvent.Type(screen.getByLabel('Your email:'), 'wooshoo@gmail.com');
  userEvent.click(screen.getByText('Submit'));
  await waitFor(()=> expect(Alert).toHaveBeenCalledTimes(1));
})