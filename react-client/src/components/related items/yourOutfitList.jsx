import React, { useState, useEffect } from 'react';

function YourOutfitList(props) {
  const [yourOutfit, updateYourOutfit] = useState(0)



  return (
    <div>
      <h3>YOUR OUTFIT</h3>
      <button onClick={() => alert('Added to Your Outfit')}>+</button>
    </div>
  )
}

export default YourOutfitList