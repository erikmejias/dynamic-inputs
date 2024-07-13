import './App.css';
import React, { useState } from 'react';


function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dynamicText, setDynamicText] = useState('');
  const [age, setAge] = useState('');

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
          <input className='input' type="text" value={dynamicText} onChange={(e) => setDynamicText(e.target.value)} />
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
