import React, {useState} from 'react';

import './styles.css'

function ByteBoxForm() {
  return (
    <div className="byte-box-form container">
      AAAAAAAAAAAAAA
    </div>
  )
}

export default function ByteBox(){
  const [number, setNumber] = useState(255);
  const [base, setBase] = useState(10);

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="byte-number-container" onClick={() => setShowForm(!showForm)}>
        <p>{number ? number.toString(base) : '+'}</p>
        <p>{
          number && (
            base === 10 ? 'dec' :
            base === 2 ? 'bin' :
            base === 16 ? 'hex' : 'oct'
          )
          }</p>
      </div>
      {showForm && <ByteBoxForm/>}
    </>
  )
}