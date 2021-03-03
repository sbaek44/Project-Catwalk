import React, { useEffect, useState } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import QuestionList from './QuestionList.jsx';
import Answers from './Answers.jsx';
import SearchBar from './SearchBar.jsx'
import QuestionModals from './QuestionModals.jsx'

const Questions = (props) => {
  const [questions, setQuestions] = useState([]);
  const [addQuestions, hasClicked] = useState(false)
  const [currentQuestion, changeQuestionLen] = useState(4)
  const [helpfulClicked, setHelpfulClicked] = useState([])
  const [searchValue, setSearchValue] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    getQuestions();
  }, [props.currentProduct]);


  let getQuestions = () => {
    if(props.currentProduct) {
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
    <div>
      <span className = 'question_body'>
      Q: {question.question_body}
      </span>
      <Answers key = {index} id = {question.question_id} questionInfo={question} product = {props.currentProduct}/>

      <span className = 'nameNHelpfulness'>
      by {question.asker_name},
      {date.toDateString().substring(4)}  |

      <div>{helpfulClicked.indexOf(question.question_id) < 0 ? <div> <p onClick = {()=>{increaseHelpfulness(question)}}>Helpful? Yes {question.question_helpfulness}</p> </div>
      : <div> <p>Helpful? Yes {question.question_helpfulness}</p> </div>}</div>

      {question.reported}
      </span>
    </div>
    )
  }

  let insertAllQuestion = () => {
    //If search character length is greater than or equal to 3,
    if(search.length >= 3) {
      return (
        <div>
      {questions.length >= currentQuestion ? //On page load, we want to display up to 2 questions
        <div>
        {searchValue.slice(0,currentQuestion).map( (question, index) => {
          return (
            <div key = {index}>
              {insertQuestion(question, index)}
            </div>
          )
        })}
        <button onClick= {()=> {changeQuestionLen(currentQuestion+2)}}>MORE ANSWERED QUESTIONS</button>
        {/* <button>ADD A QUESTION +</button> */}
        </div>
       : //If More Answered Questions is clicked, it will display 2 additional questions for the product.
       <div>
       {searchValue.map( (question, index) => {
         return (
           <div key = {index}>
             {insertQuestion(question, index)}
           </div>
         )
       })}
       <button onClick= {()=> {changeQuestionLen(currentQuestion+2)}}>LESS ANSWERED QUESTIONS</button>
       {/* <button>ADD A QUESTION +</button> */}
       </div>
       }
       </div>
      )
    } else if (search.length <= 2) { //If search length is less than 3, we want to display the original questions lists.
      return (
        <div>
          {questions.length >= currentQuestion ?
        <div>
        {questions.slice(0, currentQuestion).map( (question, index) => {
          return (
            <div key = {index}>
              {insertQuestion(question, index)}
            </div>
          )
        })}
        <button onClick= {()=> {changeQuestionLen(currentQuestion+2)}}>MORE ANSWERED QUESTIONS</button>
        {/* <button>ADD A QUESTION +</button> */}
        </div>
       : //If More Answered Questions is true, it will display all the question for the product.
       <div>
       {questions.map( (question, index) => {
         return (
           <div key = {index}>
             {insertQuestion(question, index)}
           </div>
         )
       })}
       {/* <button>ADD A QUESTION +</button> */}
       </div>
       }
        </div>
      )
    }
  }


  return ( 
    //If More Answered Questions is false, it will only show up to 4 questions.
    <div>
      {questions.length > 0 ?
      <div>
        <SearchBar questions = {questions} setSearchValue= {setSearchValue} searchValue= {searchValue} setSearch={setSearch} search= {search} insertAllQuestion={insertAllQuestion}/>
        {insertAllQuestion()}
        <QuestionModals product = {props.currentProduct}/>
        </div>
      :<button>ADD A QUESTION +</button>
      }
    </div>
  )
}

export default Questions;