import App from '../react-client/src/components/App';
import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';


Enzyme.configure({ adapter: new Adapter() });

it('works', () => {
  const wrap = shallow(
    <App />
  )
  expect(
    wrap.containsMatchingElement(
      <div>React</div>
    )
  ).toBeTruthy()
})