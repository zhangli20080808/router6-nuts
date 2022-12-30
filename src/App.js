import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet
} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path='person' element={<Person />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

function Layout(params) {
  return (
    <div>
      <h1>Layout</h1>
      <Link to='/'> 首页</Link>
      <Link to='/person'> 个人中心</Link>
      <Outlet/>
    </div>
  );
}

function Home(params) {
  return <div>home</div>;
}
function Person(params) {
  return <div>person</div>;
}

export default App;
