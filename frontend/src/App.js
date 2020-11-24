import './App.css';
import ListUsers from './components/displayUsers.js'


function App() {

  return (
    <div className="App">
      <div className="topBar">
        <h3>Ghosted</h3>
      </div>
      <ListUsers />
    
    </div>
  );
}

export default App;
