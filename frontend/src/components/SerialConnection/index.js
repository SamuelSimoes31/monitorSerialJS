import React, {useState, useEffect} from 'react';
import {useGeneralContext} from '../GeneralContext';

export default function SerialConnetion() {
  const { socket, portIsOpen } = useGeneralContext()

  const [ports,setPorts] = useState([])

  useEffect( () => {
    socket.emit('seriaportList')
    socket.on('seriaportList', list => {
      setPorts(list)
      if(list.length === 0) alert('It looks like there is no serial port available!')
    })
  },[socket])

  function handleSubmit(e){
    e.preventDefault()
    const form = {}
    const data = new FormData(e.target)
    for (let entry of data.entries()) {
      form[entry[0]] = entry[1]
    }

    if(portIsOpen) socket.emit('closeSerial')
    else socket.emit('openSerial',form)
  }

  return(
    <div className="container">
      <form name="serial" onSubmit={handleSubmit} defaultValue="">
        <label >port</label>
        <select name="path" onClick={() => socket.emit('seriaportList')} disabled={ !portIsOpen ?'':'disabled'} >
          {ports.map(port => {
            return  <option key={port.path} value={port.path}>
                      {port.path+': '+port.manufacturer}
                    </option>}
          )}
        </select>
        <label >baudrate</label>
        <select name="baud" defaultValue={9600} disabled={ ports.length && !portIsOpen ?'':'disabled'}>
          <option value={300}>300</option>
          <option value={600}>600</option>
          <option value={1200}>1200</option>
          <option value={2400}>2400</option>
          <option value={4800}>4800</option>
          <option value={9600}>9600</option>
          <option value={14440}>14440</option>
          <option value={19200}>19200</option>
          <option value={38400}>38400</option>
          <option value={56000}>56000</option>
          <option value={57600}>57600</option>
          <option value={115200}>115200</option>
        </select>
        <input type="submit" value={portIsOpen?'CLOSE':'OPEN'} disabled={ ports.length ?'':'disabled'} />
      </form>
    </div>
  )
}