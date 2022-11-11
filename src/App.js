import './App.css';
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import { AlertProvider } from './context/AlertContext';

// import Login from './Components/Login';

function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <AlertProvider>
    <Routes>
      <Route exact path="/" element={<><Home /></>}/>
      <Route exact path="/login" element={<> <Login />  </>}/>
      <Route exact path="/signup" element={<> <Signup />  </>}/>
      
      <Route exact path="/about" element={<><About /></>} />
    </Routes>
    </AlertProvider>
  </BrowserRouter>
  </NoteState>
    </>
  );
}

export default App;
