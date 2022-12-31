// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   Outlet,
//   // NavLink,
//   useParams,
//   useNavigate,
//   // Navigate
//   // createBrowserRouter
//   // createHashRouter
// } from 'react-router-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from './mini-react-router';
import './App.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            {/* Route 的 index 属性就是用来展示默认子路由的 */}
            <Route path='/' element={<Home />}></Route>
            <Route path='product' element={<Product />}>
              {/* <Route path=':id' element={<ProductDetail />}></Route> */}
            </Route>
            {/* <Route path='*' element={<NoMatch />}></Route> */}
          </Route>
          {/* <Route path='product' element={<Product />} /> */}
        </Routes>
      </BrowserRouter>
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
      {/* <Link to='/product/123'>商品详情</Link>
      {/* 想要显示详情，详情是子路由  添加 Outlet*/}
    </div>
  );
}
// function ProductDetail() {
//   const params = useParams();
//   const navigate = useNavigate();
//   console.log(params);
//   return (
//     <>
//       <div>商品详情 - id: {params.id}</div>
//       {/* 命令跳转方式 */}
//       <button onClick={() => navigate('/')}>go Home</button>
//     </>
//   );
// }

function NoMatch(params) {
  return <div>No found</div>;
}
export default App;
