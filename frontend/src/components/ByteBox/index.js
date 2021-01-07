import React, {useState} from 'react';

import './styles.css'

function ByteBoxForm({nState}) {

  function setNumber(e,base){
    let num = e.target.value;
    if(num == '') nState.setNumber(0);
    else {
      num = parseInt(num,base);
      if(!num) num = 0;
      else if(num > 255) num = 255;
      nState.setNumber(num);
    }
  }

  function submitNumber(e){
    e.preventDefault();
    nState.setShowForm(false);
  }

  return (
    <div className="byte-box-form container">
      <form onSubmit={submitNumber}>
        <div>
          <label htmlFor="dec">dec</label>
          <input
            type="number"
            name="dec"
            min="0"
            max="255"
            value={nState.number}
            onClick={() => nState.setBase(10)}
            onChange={(e) => setNumber(e,10)}
          />
        </div>
        <div>
          <label htmlFor="oct">oct</label>
          <input
            type="text"
            name="oct"
            min="0"
            value={nState.number.toString(8)}
            onClick={() => nState.setBase(8)}
            onChange={(e) => setNumber(e,8)}
          />
        </div>
        <div>
          <label htmlFor="bin">bin</label>
          <input
            type="text"
            name="bin"
            value={nState.number.toString(2)}
            onClick={() => nState.setBase(2)}
            onChange={(e) => setNumber(e,2)}
          />
        </div>
        <div>
          <label htmlFor="hex">hex</label>
          <input
            type="text"
            name="hex"
            value={nState.number.toString(16)}
            onClick={() => nState.setBase(16)}
            onChange={(e) => setNumber(e,16)}
          />
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
        <p>{base ? number.toString(base) : '+'}</p>
        <p>{
          base && (
            base === 10 ? 'dec' :
            base === 2 ? 'bin' :
            base === 16 ? 'hex' : 'oct'
          )
          }</p>
      </div>
      {showForm && <ByteBoxForm nState={{number,setNumber,base,setBase,setShowForm}}/>}
    </>
  )
}