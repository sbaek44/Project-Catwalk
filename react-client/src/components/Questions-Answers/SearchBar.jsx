import React, { useEffect, useState } from 'react';

const SearchBar = (props) => {
  const [searchValue, setSearch] = useState('')

  let filterQuestions = ()=> {
    if(searchValue.length >= 3) {
      return (
      <div>
        {props.questions.filter(question => question.question_body.toLowerCase().includes(searchValue.toLowerCase())).map( (q, index) => {
          return (
            <p key = {index}>{q.question_body}</p>
            )
        })}

      </div>
        )
    }
  }
  return (
    <div>
      <input className ='search'
      type= 'text'
      placeholder='Have a question? Search for answers…'
      value={searchValue}
      onChange={e => setSearch(e.target.value)}/>
      {filterQuestions()}
    </div>
  );
};

export default SearchBar;
