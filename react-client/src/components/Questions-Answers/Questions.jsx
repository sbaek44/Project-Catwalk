import React, { useEffect, useState } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import QuestionList from './QuestionList.jsx';
import Answers from './Answers.jsx';
import SearchBar from './SearchBar.jsx'

const Questions = (props) => {
  const [questions, setQuestions] = useState([]);
  const [moreQuestions, hasClicked] = useState(false)
  const [helpfulClicked, setHelpfulClicked] = useState([])

  useEffect(() => {
    getQuestions();
  }, [helpfulClicked]);

  let getQuestions = () => {
    let id = props.currentProduct.id || 16095;
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions?product_id=${id}&count=100`, header)
      .then((question) => {
        setQuestions(question.data.results)
      })

  };

  // let sortQuestions = () => {
  //   setQuestions(questions.sort( (a,b) => a.question_helpfulness > b.question_helpfulness? 1: -1))
  // }


  let increaseHelpfulness = (question) => {
    let id = question.question_id || 11111
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${id}/helpful`,null ,header)
    .then(()=> {setHelpfulClicked(prevArray=> [...prevArray, id])})
    .catch( (err)=> {console.log(err)})

  }


  let insertQuestion = (question, index)=> {
    let date = new Date(question.question_date)
    return (
    <div>
      <span className = 'question_body'>
      Q: {question.question_body}
      </span>
      <Answers key = {index} id = {question.question_id}/>

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


  return ( 
    //If More Answered Questions is false, it will only show up to 4 questions.
    <div>
      {questions.length > 0 ?
      <div>
        <SearchBar questions = {questions}/>
        {!moreQuestions ?
        <div>
        {questions.slice(0,4).map( (question, index) => {
          return (
            <div key = {index}>
              {insertQuestion(question, index)}
            </div>
          )
        })}
        <button onClick= {()=> {hasClicked(!moreQuestions)}}>MORE ANSWERED QUESTIONS</button>
        <button>ADD A QUESTION +</button>
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
       <button onClick= {()=> {hasClicked(!moreQuestions)}}>LESS ANSWERED QUESTIONS</button>
       <button>ADD A QUESTION +</button>
       </div>
       }
       </div>
      :<button>ADD A QUESTION +</button>


    }



    </div>
  )
}

export default Questions;