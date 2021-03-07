import React, {useState, useEffect} from 'react';

export default function ZoomedImage({url, zoom}) {

  const [backgroundImage, setBackgroundImage] = useState('');
  const [backgroundPosition, changePosition] = useState('0% 0%')

  useEffect(() => {
    setBackgroundImage(`url(${url})`)
  }, [url])

  const handleMouseMove = e => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.pageX - left) / width * 250
    const y = (e.pageY - top) / height * 250
    changePosition(`${x}% ${y}%`)
  }

  return (
    <figure onMouseMove={(e) => handleMouseMove(e)} style={{backgroundImage, backgroundPosition}} onClick={() => zoom()}>
      <img id='zoomed-image' src={url} />
    </figure>
  )

}

