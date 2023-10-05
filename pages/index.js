'use client';
import React, { useEffect, useState } from 'react';
import FormA from './FormA';
import FormB from './FormB';
import Summary from './Summary';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [age, setAge] = useState('');

  const saveFormData = (type,value)=>{
    let newFormData = {...formData}
    newFormData[type]=value;
    setFormData(newFormData);
    if(type==="show") setStep(4);
  }
  useEffect(()=>{
    if(age>0){
      saveFormData("age",age);
    }
  },[age])
  useEffect(()=>{
    if(step===2) saveFormData("formType","Form A")
    else if(step===3) saveFormData("formType","Form B")
  },[step])
  return (
    <div>
      {(step === 1 || !age) && (
        <div id='start-page'>
          <h1>Step 1: Select Form Type and Enter Age</h1>
          <label>
            Enter your age:
            <input type='number' value={age} onChange={e=>setAge(e.target.value)} required/>
          </label>
          <br />
          <label>
            Select Form Type:
            <select onChange={(e) => setStep(parseInt(e.target.value))} required>
              <option value={1}>--Select--</option>
              <option value={2}>Form A</option>
              <option value={3}>Form B</option>
            </select>
          </label>
          <br />
        </div>
      )}
      {age && step === 2 && (
        <div>
          <FormA age={age} onSubmit={saveFormData}/>
        </div>
      )}
      {age && step === 3 && (
        <div>
          <FormB age={age} onSubmit={saveFormData}/>
        </div>
      )}
      {(step === 2 || step === 3) && age ? (
        <button id='go-back' onClick={() => setStep(1)}>
          Go Back
        </button>
      ) : null}

      {step === 4 && (
        <div>
          <Summary formData={formData} />
          <button id='start-over' onClick={()=>{
            setStep(1);
            setFormData({});
          }} >Start Over</button>
        </div>
      )}
    </div>
  );
};

export default App;
