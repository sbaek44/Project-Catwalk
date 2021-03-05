import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'

const AnswerPicture = (props) => {
  const [currentPic, setCurrentPic] = useState(0)


  useEffect( ()=> {

  }, [])

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


  // currentPic !== image.id ?
  let picModalFunc=() => {
    {props.answer.photos !== undefined ? <div className="answerImages">
    {props.answer.photos.map( (image,index)=>  {

      return

      <Modal
      ariaHideApp={false}
      isOpen={photoClicked}
      style={customStyles}
      onRequestClose={() => setClicked(!photoClicked)}
      contentLabel="Example Modal">
        // ( <img onClick={()=>{setCurrentPic(image.id)}} className='img' src={image.url} alt="" key={index}/>)
      :<div key={index}>
        <button onClick={()=>{setCurrentPic(0)}}>X</button>
        <img className='img' src={image.url} alt="" key={index}/>
        </div>

      </Modal>


    })}
  </div>
    :null}}

  return (
    <div>
      {/* {picModalFunc()} */}
    </div>

  );
};

export default AnswerPicture;
