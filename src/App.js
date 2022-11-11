import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import PageNotFound from './components/PageNotFound';
import { AlertProvider } from './context/AlertContext';
import AddNote from './components/AddNote';


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
      <Route exact path="/newnote" element={<><AddNote /></>} />
      <Route path="*" element={<><PageNotFound/></>} />
    </Routes>
    </AlertProvider>
  </BrowserRouter>
  </NoteState>
    </>
  );
}

export default App;
