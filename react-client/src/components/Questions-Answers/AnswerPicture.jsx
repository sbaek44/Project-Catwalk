import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'

const AnswerPicture = (props) => {
  const [currentPic, setCurrentPic] = useState([])
  const [photoClicked, setClicked] = useState(false)


  useEffect( ()=> {

  }, [currentPic])

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



  let selectedPhoto = (image) => {
    setCurrentPic(image)
    setClicked(!photoClicked)

  }

  let correct = (image) => {
    return currentPic.url

  }

  return (
    <div style={{paddingLeft: "30px"}}>
         {props.answer.photos.length >0 ? <div className="answerImages">
    {props.answer.photos.map( (image,index)=>  {
      return (
        <div key ={index}>
      <Modal
      ariaHideApp={false}
      isOpen={photoClicked}
      className ="ModalStyle"
      overlayClassName = "ModalOverlay"
      onRequestClose={() => setClicked(!photoClicked)}
      contentLabel="Example Modal">
        <button className="buttonModal" onClick={()=>{setClicked(!photoClicked)}}>X</button>
         <img className='imgModal' src={correct(image)} alt="" key={index}/>


      </Modal>
      <img onClick={()=>{selectedPhoto(image)}} className='img' src={image.url} alt="" key={index}/>
      </div>
      )

    })}
  </div>
    :null}
    </div>

  );
};

export default AnswerPicture;
