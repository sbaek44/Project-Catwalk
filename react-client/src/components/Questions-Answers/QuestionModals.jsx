import React, { useEffect, useState } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import Modal from 'react-modal'


const QuestionModals = (props) => {
  const [addClick, addClicked] = useState(false)
  const [question, setQuestion] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };


  useEffect( ()=> {

  },[])

  let addQuestions = () => {
    let id = props.product.id
      axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions`,{
        body: question,
        name: nickname,
        email: email,
        product_id: props.product.id
      }, header)
      .then( ()=> {props.getQuestions()})
      .then(() => {console.log('success')})
      .catch( (err)=> {console.log('error')})

  };


  let validEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
  }


  let submitHandler = (e) => {
    e.preventDefault()
   let error = []
    if (question.length === 0) {error.push("You must enter the following: Question")}
    if (nickname.length === 0) {if (error.length===0){error.push("You must enter the following: Name")} else{error.push(", Name")}}
    if (email.length === 0) {if (error.length===0){error.push("You must enter the following: Email")} else{error.push(", Email")}}
    else if (!validEmail(email)) {if(error.length ===0) {error.push('The email address provided is not in correct email format')} else{error.push(', and The email address provided is not in correct email format')}}


    if(error.length===0) {addQuestions()}
    else {alert(error.join(''))}
  }

  return (
    <div>
      <Modal
      ariaHideApp={false}
      isOpen={addClick}
      style={customStyles}
      onRequestClose={() => addClicked(!addClick)}
      contentLabel="Example Modal">
      <div className = "QuestionModal">
        <h1>Ask Your Question</h1> <h3>About the {props.product.name}</h3>
        <form onSubmit ={submitHandler}>

          <label>Your Question *
          <input type="text" onChange= {e=> setQuestion(e.target.value)} value= {question}></input>
          </label>


          <label>What is your nickname?*
          <input type="text" placeholder="Example: jackson11!" onChange= {e=> setNickname(e.target.value)} value = {nickname}></input>
          For privacy reasons, do not use your full name or email address
          </label>

          <label>Your Email*
            <input type="text" placeholder="Why did you like the product or not?" onChange= {e=> setEmail(e.target.value)} value={email}></input>
            For authentication reasons, you will not be emailed
          </label>

          <input type="submit" value = "Submit"></input>


        </form>
        </div>

        </Modal>
        <button onClick={()=>{addClicked(!addClick)}}>ADD A QUESTION +</button>
    </div>
      )
};

export default QuestionModals;
