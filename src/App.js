import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  NavLink,
  useParams,
} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path='product' element={<Product />}>
              <Route path=':id' element={<ProductDetail />}></Route>
            </Route>
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
      <Link to='/product'> 商品中心</Link>
      <Outlet />
    </div>
  );
}

function Home(params) {
  return (
    <div>
      home
      {/* <Link to='/'>首页</Link> */}
      {/* <Link to='/product'>商品</Link> */}
      {/* <NavLink to='messages'>Message</NavLink> */}
    </div>
  );
}
function Product(params) {
  return (
    <div>
      <h1>product</h1>
      <Link to='/product/123'>商品详情</Link>
      {/* 想要显示详情，详情是子路由  添加 Outlet*/}
      <Outlet />
    </div>
  );
}
function ProductDetail() {
  const params = useParams();
  console.log(params);
  return (
    <>
      <div>商品详情 - id: {params.id}</div>
    </>
  );
}

export default App;
