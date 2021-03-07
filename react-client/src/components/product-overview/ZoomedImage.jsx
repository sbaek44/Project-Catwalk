import React, {useState, useEffect} from 'react';

export default function ZoomedImage({url, zoom}) {

  const [backgroundImage, setBackgroundImage] = useState('');
  const [backgroundPosition, changePosition] = useState('50% 50%');

  useEffect(() => {
    setBackgroundImage(`url(${url})`)
  }, [url]);

  const handleMouseMove = e => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    // console.log(e.pageX, e.pageY, left, top, width, height)
    const x = e.pageX / width * 100
    const y = e.pageY / height * 100
    console.log(x, y);
    changePosition(`${x}% ${y}%`);
  }

  return (
    <figure onMouseMove={(e) => handleMouseMove(e)} style={{backgroundImage, backgroundPosition}} onClick={() => zoom()}>

    </figure>
  )

}

