import React from 'react'
import './Errors.css'
function Errors(props) {
  return (
    <div className='error'>
        <p className='errormsg'>{props.error}</p> 
    </div>
  )
}

export default Errors