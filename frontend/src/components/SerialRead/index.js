import React, {useState, useEffect} from 'react';
import {useGeneralContext} from '../GeneralContext';

export default function SerialRead() {
  const { socket, portIsOpen } = useGeneralContext()
  const [readMessages,setReadMessages] = useState('')

  useEffect( () => {
    socket.on('serialRead',msg => {
      console.log(msg)
      setReadMessages(previous => previous.concat(msg))
    })
  },[socket])

  return(
    <div className="container">
      <textarea rows={5} cols={80} value={readMessages} readOnly disabled={ portIsOpen ?'':'disabled'}/>
    </div>
  )
}