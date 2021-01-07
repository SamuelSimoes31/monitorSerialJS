import React, {useState} from 'react';

import './styles.css'

function ByteBoxForm() {
  return (
    <div className="byte-box-form container">
      <form action="">
        <div>
          <label htmlFor="dec">dec</label>
          <input type="number" name="dec"/>
        </div>
        <div>
          <label htmlFor="oct">oct</label>
          <input type="number" name="oct"/>
        </div>
        <div>
          <label htmlFor="bin">bin</label>
          <input type="number" name="bin"/>
        </div>
        <div>
          <label htmlFor="hex">hex</label>
          <input type="text" name="hex" />
        </div>
        <button type="submit">Set</button>
      </form>
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