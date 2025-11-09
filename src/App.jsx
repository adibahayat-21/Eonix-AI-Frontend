import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatWindow from './ChatWindow';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import { MyContext } from './MyContext'
import SideBar from './SideBar';
import { useState } from 'react';
import {v1 as uuidv1} from "uuid";

function App() {
  
  const [prompt,setPrompt]=useState("");
  const [reply,setReply]=useState(null);
  const [currThreadId,setCurrThreadId]=useState(uuidv1());
  const [threads,setThreads]=useState([]);      // list of threads for sidebar
  const [newChat,setNewChat]=useState(true);
  const [msg,setMsg]=useState([]);      //stores all chats of current thread

  // passing down the values to Provider through this variable which stores the values
  const providerValues={
    prompt,setPrompt,
    reply,setReply,
    currThreadId,setCurrThreadId,
    threads,setThreads,
    newChat,setNewChat,
    msg,setMsg
}; 

  return (
    <>
     <MyContext.Provider value={providerValues}>
       {/*  Yeh providerValues ka data ab sabhi components ko accessible hai 
       iska mtlb h ki App component sabhi child components ko ye 4 cheezein "provide" kar raha hai.*/}

      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/chatwindow' element={<ChatWindow/>}/>
    </Routes>
    </BrowserRouter>
      {/* this Provider is used to aoid props drilling and this is a part of React Context api it is used to share data globally */}
     </MyContext.Provider>
    </>
  )
}

export default App
