import React, { useEffect, useState } from 'react';

const AnswerPicture = (props) => {
  const [currentPic, setCurrentPic] = useState(0)


  useEffect( ()=> {

  }, [])


  // currentPic !== image.id ?
  let picModalFunc=() => {
    {props.answer.photos !== undefined ? <div className="answerImages">
    {props.answer.photos.map( (image,index)=>  {
      console.log(image.url)
      return <img  className='img' src={image.url} alt="" key={index}/>
        // ( <img onClick={()=>{setCurrentPic(image.id)}} className='img' src={image.url} alt="" key={index}/>)
      {/* :<div key={index}>
        <button onClick={()=>{setCurrentPic(0)}}>X</button>
        <img className='img' src={image.url} alt="" key={index}/>
        </div> */}



    })}
  </div>
    :null}}

  return (
    <div>
      {picModalFunc()}
    </div>

  );
};

export default AnswerPicture;
