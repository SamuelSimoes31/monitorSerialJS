import React, {useState, useEffect} from 'react';
import {useGeneralContext} from '../GeneralContext';

export default function SerialRead() {
  const { socket, portIsOpen } = useGeneralContext()
  const [writeMessages,setWriteMessages] = useState('OXE')
  const [byteMode,setByteMode] = useState(false)

  function handleSend(){
    socket.emit('writeSerial',writeMessages)
  }

  return(
    <div className="container">
      {
        byteMode ?
        <div className="byteModeContainer">
          <p>QUADRADO</p>
        </div>
        :
        <div>
          <textarea
          rows={5}
          cols={80}
          value={writeMessages}
          onChange={e => setWriteMessages(e.target.value)}
          disabled={ portIsOpen ?'':'disabled'}
          />
        </div>
      }
      
      <button onClick={() => { setByteMode(!byteMode)}}>
        {byteMode?"Switch to ASCII mode":"Switch to byte mode"}
      </button>
      <button onClick={handleSend}>SEND</button>
    </div>
  )
}