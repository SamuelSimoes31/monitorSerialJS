import React, {useState, useEffect} from 'react';
import {useGeneralContext} from '../GeneralContext';
import ByteBox from '../ByteBox';

import './styles.css'

export default function SerialRead() {
  const { socket, portIsOpen } = useGeneralContext()
  const [writeMessage,setWriteMessage] = useState([1,2,3])

  const [byteMode,setByteMode] = useState(true)

  function handleSend(){
    socket.emit('writeSerial',writeMessage)
  }

  function handleSwitchMode() {
    setByteMode(!byteMode);
  }

  useEffect(() => {
    console.log('writeMessage:',writeMessage);
  },[writeMessage])

  return(
    <div className="container">
      {
        byteMode ?
        (
          <div className="byte-mode-container">
            {
              writeMessage.map((e,i,a) => {
                console.log(writeMessage)
                return <ByteBox key={i} index={i} element={e} array={a} setMessage={setWriteMessage}/>
              })
            }
          </div>
        ) : (
          <textarea
          rows={5}
          cols={80}
          value={writeMessage}
          onChange={e => setWriteMessage(e.target.value)}
          disabled={ portIsOpen ?'':'disabled'}
          />
        )
      }
      <span>
        <button onClick={handleSwitchMode}>
          {byteMode?"Switch to ASCII mode":"Switch to byte mode"}
        </button>
        <button onClick={handleSend}>SEND</button>
      </span>
    </div>
  )
}