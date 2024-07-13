import './App.css';
import React, { useState } from 'react';
import EditableInput from './components/EditableInput';


function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dynamicText, setDynamicText] = useState('{{wf {value 3} }}');
  const [age, setAge] = useState('');

  const handleDynamicText = (value: string) => {
    console.log(value);
    setDynamicText(value);
  }

  return (
    <div id="root">
      <form>
        <div className="field-group">
          <label>Name:</label>
          <input className='input' type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field-group">
          <label>Email:</label>
          <input className='input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field-group">
          <label>Dynamic Text:</label>
          <EditableInput value={dynamicText} onChange={handleDynamicText} />
        </div>
        <div className="field-group">
          <label>Age:</label>
          <input className='input' type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <button className='submit-button' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
