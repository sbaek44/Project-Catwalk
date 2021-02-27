import React from 'react';

const SortForm = (props) => (
    <select onChange={props.updateParamFunc}>
      {props.sortParameters.map((param, i) => (
        <option value={param} key={i}>
          {param}
        </option>
      ))}
    </select>
);

export default SortForm;
