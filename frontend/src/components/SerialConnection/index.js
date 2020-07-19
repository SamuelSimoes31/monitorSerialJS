import React, {useState, useEffect} from 'react';
import {useGeneralContext} from '../GeneralContext';

export default function SerialConnetion(props) {
  const { socket, portIsOpen, setPortIsOpen } = useGeneralContext()

  const [ports,setPorts] = useState([])

  useEffect( () => {
    socket.on('seriaList', list => {
      console.log(list)
      setPorts(list)
    })
  },[socket])

  return(
    <div className="container">
      <form name="serial">
        <label >port</label>
        <select name="ports">
          {ports.map(port => <option key={port.path} value={port.path}>{port.path+': '+port.manufacturer}</option>)}
        </select>
      </form>
    </div>
  )
}