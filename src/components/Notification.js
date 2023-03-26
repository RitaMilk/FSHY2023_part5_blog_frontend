import React from "react"
const Notification = ({ message, style }) => {
  //debugger
  if (message === null) {
    return null
  } else {
    if (style === "success") {
      return <div className='success'>{message}</div>
    }
    return <div className='error'>{message}</div>
  }
}
export default Notification
