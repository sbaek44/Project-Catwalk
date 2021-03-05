import React, { useEffect, useState } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import AnswerList from './AnswerList.jsx';
import AnswerModals from './AnswerModals.jsx'
import AnswerPicture from './AnswerPicture.jsx'


const Answers = (props) => {
  const [answers, setAnswers] = useState([]);
  const [helpfulClicked, setHelpfulClicked] = useState([])
  const [reportClicked, setReportClicked] =useState([])
  const [moreAnswers, setMoreAnswers] = useState(false)
  const [picmodal, setPicModal] = useState(false)

  useEffect(() => {
    getAnswers();

  }, [helpfulClicked], [reportClicked]);

  let getAnswers = () => {
    let id = props.id
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
            <div>
              {/* {answer.photos !== undefined ? <div className="answerImages">
                {answer.photos.map( (image,index)=> {
                  return !picmodal? <img onClick={()=>{setPicModal(!picmodal)}} className='img' src={image.url} alt="" key={index}/>
                  : <img onClick={()=>{setPicModal(!picmodal)}} src={image.url} alt="" key={index}/>
                })}
              </div>
              :null} */}
              <AnswerPicture answer ={answer} key = {index}/>
            </div>
            {answer.answerer_name === "Seller" ?
            <div className="AnswerHelp">
              <p>by <span style = {{fontWeight: 'bold'}}>{answer.answerer_name}</span>, {date.toDateString().substring(4)}</p>
              <div className='helpItem'>{helpfulClicked.indexOf(answer.answer_id) < 0 ? <div> <p onClick = {()=>{increaseHelpfulness(answer)}}> Helpful? <span style ={{textDecorationLine: 'underline'}}>Yes</span>  ({answer.helpfulness})</p> </div>
            : <div> <p>Helpful? Yes ({answer.helpfulness})</p> </div>}</div>
            <div className='helpItem'>{reportClicked.indexOf(answer.answer_id) < 0 ? <div><p onClick = {()=>{reportAnswer(answer)}} style = {{textDecorationLine:'underline'}}> Report</p></div>
            : <div><p onClick = {()=>{reportAnswer(answer)}}>Reported</p></div>}</div>
            </div>
            :<div className="AnswerHelp">
              <p>by {answer.answerer_name}, {date.toDateString().substring(4)} | </p>
              <div className='helpItem'>{helpfulClicked.indexOf(answer.answer_id) < 0 ? <div> <p onClick = {()=>{increaseHelpfulness(answer)}}> Helpful? <span style ={{textDecorationLine: 'underline'}}>Yes</span>  ({answer.helpfulness})</p> </div>
            : <div> <p>Helpful? Yes ({answer.helpfulness})</p> </div>}</div>
            <div className='helpItem'>{reportClicked.indexOf(answer.answer_id) < 0 ? <div><p onClick = {()=>{reportAnswer(answer)}} style = {{textDecorationLine:'underline'}}> Report</p></div>
            : <div><p onClick = {()=>{reportAnswer(answer)}}>Reported</p></div>}</div>
            </div>
            }


            {/* <div>{helpfulClicked.indexOf(answer.answer_id) < 0 ? <div> <p onClick = {()=>{increaseHelpfulness(answer)}}>Helpful? Yes {answer.helpfulness}</p> </div>
            : <div> <p>Helpful? Yes {answer.helpfulness}</p> </div>}</div> */}

            {/* <div>{reportClicked.indexOf(answer.answer_id) < 0 ? <div onClick = {()=>{reportAnswer(answer)}}>Report</div>
            : <div>Reported</div>}</div> */}
         </div>
          )
  }




  return (
    <div>
      {!moreAnswers ?
      <div>
        {/* {<AnswerModals question = {props.questionInfo} product={props.product}/>} */}
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