import React, {useState} from 'react';

import './styles.css'

export default function ByteBox(){
  const [number, setNumber] = useState(255);
  const [base, setBase] = useState(10);
  return (
    <div className="byte-number-container">
      <p>{number ? number.toString(base) : '+'}</p>
      <p>{
        number && (
          base === 10 ? 'dec' :
          base === 2 ? 'bin' :
          base === 16 ? 'hex' : 'oct'
        )
        }</p>
    </div>
  )
}