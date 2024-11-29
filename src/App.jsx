import { useSelector } from 'react-redux';
import './App.css';
import Home from './features/home/Home';
import Login from './features/login/Login';

function App() {
  var {isLoggedIn}=useSelector(state=>state.loginReducer)
  return (
    <div>
      {isLoggedIn && <Home></Home>}
      {!isLoggedIn && <Login></Login>}
    </div>
  )
}

export default App;