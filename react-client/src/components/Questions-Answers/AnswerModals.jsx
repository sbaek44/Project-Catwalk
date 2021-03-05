import React, { useEffect, useState } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import Modal from 'react-modal';


const AnswerModals = (props) => {
  const [answer, setAnswer] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([])
  const [photoClicked, setClicked] = useState(false)
  const [imgPreview, setImgPreview] = useState([])


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
    imageDisplay()

  },[photos,imgPreview])

  let addAnswer = () => {
    let id = props.question.question_id
      axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${id}/answers`,{
        body: answer,
        name: nickname,
        email: email,
        photos: photos
      }, header)
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
    if (answer.length === 0) {error.push("You must enter the following: Question")}
    if (nickname.length === 0) {if (error.length===0){error.push("You must enter the following: Name")} else{error.push(", Name")}}
    if (email.length === 0) {if (error.length===0){error.push("You must enter the following: Email")} else{error.push(", Email")}}
    else if (!validEmail(email)) {if(error.length ===0) {error.push('The email address provided is not in correct email format')} else{error.push(', and The email address provided is not in correct email format')}}


    if(error.length===0) {addAnswer()}
    else {alert(error.join(''))}
  }

  let imageDisplay = ()=> {
    if(photos.length > 4) {
      return (
        <div>
          {imgPreview.map((image)=> {
            return <img src={image} alt="" key={image}/>
          })}
      </div>
      )
    }
    else {
      return (
        <div>
          <input type='file' onChange={getPhoto}/>
          {imgPreview.map((image)=> {
            return <img className='img' src={image} alt="" key={image}/>
          })}
        </div>
      )
    }
  }

  let getPhoto = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let img = e.target.files[0];

    reader.onloadend = () => {
      setPhotos([...photos, img])
      setImgPreview([...imgPreview, reader.result])
    }

    if(img) {reader.readAsDataURL(img);}
  }


  return (
    <div>
      <Modal
      ariaHideApp={false}
      isOpen={photoClicked}
      style={customStyles}
      onRequestClose={() => setClicked(!photoClicked)}
      contentLabel="Example Modal">
       <div className = "AnswerModal">
        <h1>Sumbit your answer</h1> <h3>{props.question.question_body}:{props.product.name}</h3>
        <form onSubmit ={submitHandler}>
          <label>Your Answer *
          <input type="text" onChange= {e=> setAnswer(e.target.value)} value= {answer}/>>
          </label>
          <label>What is your nickname? *
          <input type="text" placeholder="Example: jack543!" onChange= {e=> setNickname(e.target.value)} value = {nickname}/>
          For privacy reasons, do not use your full name or email address
          </label>
          <label>Your Email *
            <input type="text" placeholder="Example: jack@email.com" onChange= {e=> setEmail(e.target.value)} value={email}/>
            For authentication reasons, you will not be emailed
          </label>

          <input type="submit" value = "Submit"/>


          {imageDisplay()}

          {/* {!photoClicked ? <div></div>} */}


        </form>
        </div>
        </Modal>
        <p onClick={()=>{setClicked(!photoClicked)}}>Add Answer</p>
    </div>
      )
};

export default AnswerModals;
