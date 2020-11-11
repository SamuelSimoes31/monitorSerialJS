import React, {useState, useEffect} from 'react';
import {useGeneralContext} from '../GeneralContext';

export default function SerialRead() {
  const { socket, portIsOpen } = useGeneralContext()
  const [writeMessages,setWriteMessages] = useState('OXE')

  function handleSend(){
    socket.emit('writeSerial',writeMessages)
  }

  return(
    <div className="container">
      <textarea
        rows={5}
        cols={80}
        value={writeMessages}
        onChange={e => setWriteMessages(e.target.value)}
        disabled={ portIsOpen ?'':'disabled'}
      />
      <button onClick={handleSend}>SEND</button>
    </div>
  )
}