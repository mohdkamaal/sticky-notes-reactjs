import React, { useState } from 'react';
import './App.css';
import NoteList from './note/list';


const App = () => {
  return (
    <div className="App">
      <br></br>
      <NoteList />
    </div>
  );
}

export default App;
