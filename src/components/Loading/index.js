import React from 'react'
import './Loading.css'

const Loading = (props) => {
  return (
    <p className='loading' {...props}>
      {props.children}
    </p>
  )
}

export default Loading
