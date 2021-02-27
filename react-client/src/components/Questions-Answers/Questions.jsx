import React, { useEffect, useState } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import QuestionList from './QuestionList.jsx';
import Answers from './Answers.jsx';

const Questions = (props) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    getQuestions();
  }, []);

  let getQuestions = () => {
    let id = props.currentProduct.id || 16095;
    if (questions.length === 0) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions?product_id=${id}`, header)
      .then((question) => {
        setQuestions(question.data.results);
      })
      // .then( ()=> {console.log(questions)})
    }
  };

  // var hasQuestions = {
  //   if (questions.length >0) {
  //     {questions.map( (question, index) => {
  //       return (
  //         <div key = {index}>{question} </div>
  //         )
  //     })}
  //   }
  // }

  // I need 4 questions to load up
  return ( 
    <div>
      {questions.length> 0 ?
      <div>
        {/* console.log(questions) */}
      {questions.slice(0,4).map( (question, index) => {
        let date = new Date(question.question_date)
        return (
          <div key = {index}>
            <span className = 'question_body'>
            Q: {question.question_body}
            </span>
            <Answers key = {index} id = {question.question_id}/>

            <span className = 'nameNHelpfulness'>
            by {question.asker_name},
            {date.toDateString().substring(4)}  |
            {question.question_helpfulness}
            {question.reported}
            </span>



          </div>
          )
      })}
      </div>
      : null
    }
    </div>
  )
}

export default Questions;