import React, { useEffect, useState } from 'react';
import axios from 'axios';
import header from '../../../../config.js';
import Modal from 'react-modal';
import firebase from '../../../../firebase.js'

const AnswerModals = (props) => {
  const [answer, setAnswer] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([])
  const [photoClicked, setClicked] = useState(false)
  const [imgPreview, setImgPreview] = useState([])
  const [photosURL, setPhotosURL] = useState([])


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

  let upload = () => {


  let empty = []

  for (var i = 0; i < photos.length; i++) {
      var imageFile = photos[i]

      uploadImageAsPromise(imageFile);
  }



function uploadImageAsPromise (imageFile) {
  let arr = []
  return new Promise(function (resolve, reject) {
      var storageRef = firebase.storage().ref("/"+imageFile.name);
      var task = storageRef.put(imageFile)

      task.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          arr.push(downloadURL)
          console.log('File available at', downloadURL);
          resolve(
            axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${props.question.question_id}/answers`,{
              body: answer,
              name: nickname,
              email: email,
              photos: arr
            }, header)
            .then(() => {console.log('success')})
            .catch( (err)=> {console.log('error')})
          )
        });
      }
    );
  });
}

  }

  let addAnswer = () => {
    let id = props.question.question_id
      upload()
        axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${id}/answers`,{
        body: answer,
        name: nickname,
        email: email,
        photos: photosURL
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


    if(error.length===0) {upload()}
    else {alert(error.join(''))}
  }

  let imageDisplay = ()=> {
    if(photos.length > 4) {
      return (
        <div className ="allImages">
          {imgPreview.map((image)=> {
            return <img className='img' src={image} alt="" key={image}/>
          })}
      </div>
      )
    }
    else {
      return (
        <div className ="allImages">
          <input type='file' style ={{width: '705px'}}onChange={getPhoto}/>
          <div>
          {imgPreview.map((image)=> {
            return <img className='img' src={image} alt="" key={image}/>
          })}
          </div>
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
      className ="ModalStyle"
      overlayClassName = "ModalOverlay"
      onRequestClose={() => setClicked(!photoClicked)}
      contentLabel="Example Modal">
       <div className = "AnswerModal">
         <div className = "ModalHeader">
         <h1 style={{paddingTop:'5%'}}>Submit your answer</h1> <h3>{props.question.question_body}:{props.product.name}</h3>
         </div>
        <form onSubmit ={submitHandler}>

          <div className = "modalTitle">
            <p>Your Answer <span style={{color: "red"}}>*</span></p>
          <label>
          <textarea onChange= {e=> setAnswer(e.target.value)} style = {{width: "100%", height: "75px"}}maxLength ="1000" value= {answer}/>
          </label>
          </div>

          <div>
          <label>What is your nickname? <span style={{color: "red"}}>*</span>
          <input type="text" style = {{width: "80%"}} placeholder="Example: jack543!" onChange= {e=> setNickname(e.target.value)} value = {nickname}/>

          </label>
          <p style= {{fontStyle: 'italic'}}>For privacy reasons, do not use your full name or email address</p>
          </div>

          <div>
            <p>Your Email <span style={{color: "red"}}>*</span></p>
          <label>
            <input type="text" style = {{width: "80%"}} placeholder="Example: jack@email.com" onChange= {e=> setEmail(e.target.value)} value={email}/>
          </label>
          <p style= {{fontStyle: 'italic'}}>For authentication reasons, you will not be emailed</p>
          </div>

          <input style ={{borderRadius: "5px", height: "50px", width: "100px", float: "right"}}type="submit" value = "Submit"></input>
          {imageDisplay()}
        </form>
        </div>
        </Modal>
        <p onClick={()=>{setClicked(!photoClicked)}} className="addAnswer" style= {{textDecorationLine: 'underline'}}>Add Answer</p>
    </div>
      )
};

export default AnswerModals;
