import logo from '../logo.svg';
import '../App.css';

const RootPage = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="http://localhost:3000/home"
          rel="noopener noreferrer"
        >
          Home
        </a>
      </header>
    </div>
  );
}

export default RootPage;
