import { useEffect, useState } from 'react';


function App() {
  useEffect(()=>{
    const fetchData = async()=>{
    const res = await fetch('http://localhost:3000');
    const jsonData = await res.json();
      console.log(jsonData);
    };
    fetchData();
  },[]);
  
      return (
        <>
        
        </>
      );
    }
export default App;
