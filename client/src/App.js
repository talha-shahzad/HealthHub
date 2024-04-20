import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import './App.css';

function App() {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3000');
      const jsonData = await res.json();
      setJsonData(jsonData);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>My First MERN App</h1>
        </header>
        
        {/* <Switch>
          { Login Routes }
          <Route path="/auth/doctor" render={() => <LoginForm role="Doctor" />} />
        </Switch>
         */}
      </div>
      {jsonData && (
        <div>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </>
  );
}

export default App;