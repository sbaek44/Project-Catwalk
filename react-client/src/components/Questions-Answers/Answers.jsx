import React, { useEffect, useState } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import AnswerList from './AnswerList.jsx';
import Modals from './Modals.jsx'

const Answers = (props) => {
  const [answers, setAnswers] = useState([]);
  const [helpfulClicked, setHelpfulClicked] = useState([])
  const [reportClicked, setReportClicked] =useState([])
  const [moreAnswers, setMoreAnswers] = useState(false)
  const [addAnswer, setAnswer] =useState(false)

  useEffect(() => {
    getAnswers();

  }, [helpfulClicked], [reportClicked]);

  let getAnswers = () => {
    let id = props.id || 95294;
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${id}/answers`, header)
      .then((answersList) => {
        setAnswers(answersList.data.results);
      })
      .catch( (err) => {console.error(err)})

  };

  let increaseHelpfulness = (answer) => {
    let id = answer.answer_id || 11111
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/answers/${id}/helpful`,null ,header)
    .then(()=> {setHelpfulClicked(prevArray=> [...prevArray, id])})
    .catch( (err)=> {console.log(err)})

  }

  let reportAnswer = (answer) => {
    let id = answer.answer_id
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/answers/${id}/report`,null ,header)
    .then(()=> {setReportClicked(prevArray=> [...prevArray, id])})
    .catch( (err)=> {console.log(err)})

  }

  let insertAnswers = (answer, index)=> {
    let date = new Date(answer.date)
        return (
          <div>
            <span className = 'answer_body'>
            A: {answer.body}
            </span>
            {answer.answerer_name === "Seller" ? <div style = {{fontWeight: 'bold'}} >by {answer.answerer_name} </div>:  <div > by {answer.answerer_name},</div>}

            {date.toDateString().substring(4)}  |

            <div>{helpfulClicked.indexOf(answer.answer_id) < 0 ? <div> <p onClick = {()=>{increaseHelpfulness(answer)}}>Helpful? Yes {answer.helpfulness}</p> </div>
            : <div> <p>Helpful? Yes {answer.helpfulness}</p> </div>}</div>

            <div>{reportClicked.indexOf(answer.answer_id) < 0 ? <div onClick = {()=>{reportAnswer(answer)}}>Report</div>
            : <div>Reported</div>}</div>
         </div>
          )
  }

  let modalShower = () => {
    setAnswer(!addAnswer)
  }


  return (
    <div>
      {!moreAnswers ?
      <div>
        {!addAnswer? <p onClick={()=>{modalShower()}}>Add Answer</p>: <Modals />}
      {answers.slice(0, 2).map( (answer, index) => {
        return (
          <div key = {index}>{insertAnswers(answer, index)}</div>
        )
      })}
      {answers.length > 2 ? <button onClick={()=>{setMoreAnswers(!moreAnswers)}}>See more Answers</button> : null}
    </div>
    :
    <div>
        {answers.map( (answer, index) => {
          return (
            <div key = {index}>{insertAnswers(answer, index)}</div>
          )
        })}
        {answers.length > 2 ? <button onClick={()=>{setMoreAnswers(!moreAnswers)}}>Collpase answers</button> : null}
      </div> }



    </div>
  )
}

export default Answers;