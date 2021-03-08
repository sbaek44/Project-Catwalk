import React, { useEffect, useState } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
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
      axios.get(`http://127.0.0.1:3000/api/qa/questions?product_id=${id}&count=100`)
      .then((question) => {
        setQuestions(question.data.results)
      })
    }
  };


  let increaseHelpfulness = (question) => {
    let id = question.question_id
    setHelpfulClicked(prevArray=> [...prevArray, id])
    axios.put(`http://127.0.0.1:3000/api/qa/questions/${id}/helpful`,null)
    .then( ()=> {getQuestions()})
    .catch( (err)=> {console.log(err)})

  }




  let insertQuestion = (question, index)=> {
    let date = new Date(question.question_date)
    return (
    <div className="Question">

      <div className = 'question_body'>
        <p className="Qprompt">Q:</p> <p className="QuestionPrompt">{search.length > 2 ? <Highlighter searchWords={[search]} textToHighlight= {question.question_body}/> : question.question_body}</p>

        {helpfulClicked.indexOf(question.question_id) < 0 ?
        <div className="Qhelpful" onClick = {()=>{increaseHelpfulness(question)}}><p>Helpful? <span style ={{textDecorationLine: 'underline'}}>Yes</span> {question.question_helpfulness}</p></div>
        :<div className="Qhelpful" ><p>Helpful? Yes {question.question_helpfulness}</p></div> }
        {<AnswerModals question = {question} product={props.currentProduct} getQuestions={getQuestions} />}
      </div>

      <Answers key = {index} id = {question.question_id} questionInfo={question} product = {props.currentProduct}/>

      <div className = 'nameNHelpfulness'>
      by {question.asker_name}, {date.toDateString().substring(4)} | Report {question.reported}
      </div>
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
        <div onScroll= {loadMoreQ} className= {currentQuestion > 2 ? "Questions" : "Questions2"}>
        <div>

        {searchValue.slice(0,currentQuestion).map( (question, index) => {
          return (
            <div key = {index}>
              {insertQuestion(question, index)}
            </div>
          )
        })}
        {!addQuestions ? <div> <button className="moreadd" onClick= {()=> {clickStuff()}}>MORE ANSWERED QUESTIONS</button> <QuestionModals product = {props.currentProduct} getQuestions={getQuestions}/></div>: null}

        </div>

       </div>
      )
    } else if (search.length <= 2) { //If search length is less than 3, we want to display the original questions lists.
      return (
        <div  onScroll = {loadMoreQ} className= {currentQuestion > 2 ? "Questions" : "Questions2"}>



        {questions.slice(0, currentQuestion).map( (question, index) => {
          return (
            <div key = {index}>
              {insertQuestion(question, index)}
            </div>
          )
        })}
        {!addQuestions ? <div className='questionAdd'> <button className="moreadd" onClick= {()=> {clickStuff()}}>MORE ANSWERED QUESTIONS</button> <QuestionModals product = {props.currentProduct} getQuestions={getQuestions}/></div>: null}



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

        {insertAllQuestion()}



        </div>
      :<QuestionModals product = {props.currentProduct} getQuestions={getQuestions}/>
      }
    </div>
  )
}

export default Questions;