import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Router from './Components/Router';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
