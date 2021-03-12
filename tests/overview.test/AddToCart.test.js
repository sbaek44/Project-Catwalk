import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, getByPlaceholderText, waitFor, screen, getByText, getByRole
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import handlers from '../msw/handlers.js';
import AddToCart from '../../react-client/src/components/product-overview/AddToCart.jsx';
import TestAddToCart from './TestAddToCart.jsx';
import selectEvent from 'react-select-event'


const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// AddToCart props -
// product (object),
// selectedStyle (style id num),
// styleOptions (array of styles, each has an associated 'skus' object)

const productWithoutStock = [{
  id: 1,
  style_id: 1,
  name: 'Forest Green & Black',
  original_price: 140,
  sale_price: 0,
  default: true,
  skus: {}
}]

describe('add to cart module', () => {
  describe('dropdown behavior', () => {
    test('if there is no stock, the size dropdown should be disabled and read OUT OF STOCK', async () => {
      // const { getByRole, getByLabelText } = render(
      //   <form role="form">
      //     <label htmlFor="food">Food</label>
      //     <Select options={OPTIONS} name="food" inputId="food" isMulti />
      //   </form>
      // );
      // expect(getByRole("form")).toHaveFormValues({ food: "" });

      // await selectEvent.select(getByLabelText("Food"), ["Strawberry", "Mango"]);
      // expect(getByRole("form")).toHaveFormValues({ food: ["strawberry", "mango"] });

      render(<TestAddToCart product={productWithoutStock[0]} styleOptions={productWithoutStock} selectedStyle={1} />);

      screen.debug();
      // expect size dropdown to be disabled


    });
    xtest('if there is no size selected, the qty dropdown should be disabled and read -', async () => {

    });
    xtest('whenever a size is selected, the qty dropdown should default/reset to 1', async () => {

    });
    xtest('whenever a new style or product is selected, both dropdowns should return to their default states', async () => {

    });
  });
  describe('the add to cart button', () => {
    test('should be hidden if there is no stock', async () => {

      render(<AddToCart product={productWithoutStock[0]} styleOptions={productWithoutStock} selectedStyle={1} />);
      expect(screen.queryByText("ADD TO BAG")).not.toBeInTheDocument()

    });
    xtest('on click, if no size is selected, the size dropdown should open automatically and a message should appear', async () => {

    });
    xtest('on click, if a valid size and qty are selected, a post request should be sent to the cart API and an alert should appear', async () => {

    });
  });
});