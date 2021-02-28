import React, { useEffect, useState } from 'react';

const SearchBar = (props) => {
  const [searchValue, setSearch] = useState('')
  const [filteredList, setList] = useState([])

  useEffect( ()=> {
    props.setSearch(searchValue)
    props.setSearchValue(filteredList)

  }, [searchValue])

  let filterQuestions = (e)=> {
    setSearch(e.target.value);
    if( (e.target.value).length >= 3) {
      let qs = props.questions.filter(question => question.question_body.toLowerCase().includes(e.target.value.toLowerCase()))
      setList(qs)
    } else {
      setList(props.questions)
    }
  }
  return (
    <div>
      <input className ='search'
      type= 'text'
      placeholder='Have a question? Search for answers…'
      value={searchValue}
      onChange={filterQuestions}/>
    </div>
  );
};

export default SearchBar;
