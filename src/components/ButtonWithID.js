import React from "react"

const ButtonWithId = ({ handleClick, text,id }) => (
    <button onClick={()=>handleClick(id)}>
      {text}
    </button>
  )
  export default ButtonWithId