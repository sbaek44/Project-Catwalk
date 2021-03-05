import React from 'react'

export default function Banner() {
  // Last page of business requirements doc says:

  // 1. Company Name
  // With the redesign of the application, our business will also go through a rebranding.   New names for our company will be selected from an internal poll.   All members of the team will be solicited for naming ideas and then be asked to choose from those created.   This new name will be released with the new application.

  // 2. Color Scheme
  // A new brand color scheme will also be selected.   The development team will be asked to generate two color schemes, one light and one dark, that might be selected.   During the product demo, they should toggle between the two schemas to allow for a final selection.

  return (
    <div className='banner-top'>
      <span style={{color: '#fefefe', marginRight: 10}}>FOREVER</span>
      <span style={{color: 'rgb(255, 0, 140)'}}>32</span>
    </div>
  )
}