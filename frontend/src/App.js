import logo from './logo.svg';
import './App.css';

function App() {
  const getUsers = async () => {
    const response = await fetch('http://localhost:8000/')
    const jsonData = await response.json();
    console.log(jsonData)
  }

  getUsers()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>Test</code> and save to reload. 
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
