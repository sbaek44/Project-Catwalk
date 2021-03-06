import React, { useEffect, useState } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import QuestionList from './QuestionList.jsx';
import Answers from './Answers.jsx';
import AnswerModals from './AnswerModals.jsx'
import SearchBar from './SearchBar.jsx'
import QuestionModals from './QuestionModals.jsx'
import Highlighter from 'react-highlight-words'


const Questions = (props) => {
  const [questions, setQuestions] = useState([]);
  const [addQuestions, hasClicked] = useState(false)
  const [currentQuestion, changeQuestionLen] = useState(2)
  const [helpfulClicked, setHelpfulClicked] = useState([])
  const [searchValue, setSearchValue] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    getQuestions();
  }, [props.currentProduct]);


  let getQuestions = () => {
    if(props.currentProduct.id) {
    let id = props.currentProduct.id
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions?product_id=${id}&count=100`, header)
      .then((question) => {
        setQuestions(question.data.results)
      })
    }
  };

  // let sortQuestions = () => {
  //   setQuestions(questions.sort( (a,b) => a.question_helpfulness > b.question_helpfulness? 1: -1))
  // }


  let increaseHelpfulness = (question) => {
    let id = question.question_id
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${id}/helpful`,null ,header)
    .then(()=> {setHelpfulClicked(prevArray=> [...prevArray, id])})
    .then( ()=> {getQuestions()})
    .catch( (err)=> {console.log(err)})

  }




  let insertQuestion = (question, index)=> {
    let date = new Date(question.question_date)
    return (
    <div className="Question">

      <div className = 'question_body'>
        <p>Q: {search.length > 2 ? <Highlighter searchWords={[search]} textToHighlight= {question.question_body}/> : question.question_body }</p>

        {helpfulClicked.indexOf(question.question_id) < 0 ?
        <p className="Qhelpful" onClick = {()=>{increaseHelpfulness(question)}}>Helpful? <span style ={{textDecorationLine: 'underline'}}>Yes</span> {question.question_helpfulness}  |  </p>
        :<p className="Qhelpful" >Helpful? Yes {question.question_helpfulness}  |  </p> }
        {<AnswerModals question = {question} product={props.currentProduct}/>}
      </div>

      <Answers key = {index} id = {question.question_id} questionInfo={question} product = {props.currentProduct}/>

      <span className = 'nameNHelpfulness'>
      by {question.asker_name},
      {date.toDateString().substring(4)}  |



      {question.reported}
      </span>
    </div>
    )
  }

  let clickStuff = () => {
    hasClicked(true)
    changeQuestionLen(currentQuestion+2)
  }

  let insertAllQuestion = () => {
    //If search character length is greater than or equal to 3,
    if(search.length >= 3) {
      return (
        <div onScroll= {loadMoreQ}className="Questions">
        <div>

        {searchValue.slice(0,currentQuestion).map( (question, index) => {
          return (
            <div key = {index}>
              {insertQuestion(question, index)}
            </div>
          )
        })}
        {!addQuestions ? <button onClick= {()=> {clickStuff()}}>MORE ANSWERED QUESTIONS</button>: null}

        </div>

       </div>
      )
    } else if (search.length <= 2) { //If search length is less than 3, we want to display the original questions lists.
      return (
        <div  onScroll = {loadMoreQ} className="Questions">



        {questions.slice(0, currentQuestion).map( (question, index) => {
          return (
            <div key = {index}>
              {insertQuestion(question, index)}
            </div>
          )
        })}
        {!addQuestions ? <button onClick= {()=> {clickStuff()}}>MORE ANSWERED QUESTIONS</button>: null}



        </div>
      )
    }
  }
  let loadMoreQ = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && addQuestions) {
      changeQuestionLen(currentQuestion+2)
    }
  }

  return ( 
    //If More Answered Questions is false, it will only show up to 4 questions.
    <div>
      {questions.length > 0 ?
      <div>
        <div className="SearchBar">
        <SearchBar questions = {questions} setSearchValue= {setSearchValue} searchValue= {searchValue} setSearch={setSearch} search= {search} insertAllQuestion={insertAllQuestion}/>
        </div>
        {/* <InfiniteScroll
          pageStart={0}
          loadMore={loadFunc}
          hasMore={true || false}
          loader={<div className="loader" key={0}>Loading ...</div>}
        > */}
        {insertAllQuestion()}
        {/* </InfiniteScroll> */}


        <QuestionModals product = {props.currentProduct} getQuestions={getQuestions}/>
        </div>
      :<button >ADD A QUESTION +</button>
      }
    </div>
  )
}

export default Questions;