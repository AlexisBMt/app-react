import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import DocumentacionTecnica from './pages/DocumentacionTecnica'
import Home from './pages/Home/index'
import {Link, Route} from 'wouter'

function App() {
  return (
    <div>
      <Route component={ Home } path="/" />
      <Route component={ DocumentacionTecnica } path="/doumentacion-tecnica" />

    </div>
  );
}

export default App;
