import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate,
  useParams,
  Navigate,
  useLocation,
  NavLink,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Link,
//   Outlet,
//   useNavigate,
//   useParams,
//   useLocation,
//   Navigate,
//     useMatch,
//   useResolvedPath,
// } from './mini-react-router';
import './App.css';
import { AuthProvider, useAuth } from './mini-react-router/auth';
// import About from './pages/About'

const About = lazy(() => import('./pages/About'));
function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              {/* Route 的 index 属性就是用来展示默认子路由的 */}
              <Route path='/' element={<Home />}></Route>
              <Route path='product' element={<Product />}>
                <Route path=':id' element={<ProductDetail />}></Route>
              </Route>
              <Route
                path='user'
                element={
                  <RequiredAuth>
                    <User />
                  </RequiredAuth>
                }
              />
              <Route path='login' element={<Login />} />
              <Route
                path='about'
                element={
                  <Suspense fallback={<div>loading...</div>}>
                    <About />
                  </Suspense>
                }
              />
              <Route path='*' element={<NoMatch />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

function CustomLink({ to, ...rest }) {
  const resolved = useResolvedPath(to);
  console.log('to', to, resolved);
  const match = useMatch({ path: resolved.pathname, end: true });
  return <Link to={to} {...rest} style={{ color: match ? 'red' : 'black' }} />;

  // return (
  //   <NavLink
  //     to={to}
  //     {...rest}
  //     style={({ isActive }) => ({ color: isActive ? 'red' : 'black' })}
  //   />
  // );
}

function Layout() {
  return (
    <div>
      <h1>Layout</h1>
      <CustomLink to='/'> 首页</CustomLink>
      <CustomLink to='/product'> 商品中心</CustomLink>
      <CustomLink to='/user'> 用户中心</CustomLink>
      <CustomLink to='/login'> 登录</CustomLink>
      <CustomLink to='/about'> 关于</CustomLink>
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      home
      {/* <CustomLink to='/'>首页</CustomLink> */}
      {/* <CustomLink to='/product'>商品</CustomLink> */}
      {/* <NavCustomLink to='messages'>Message</NavCustomLink> */}
    </div>
  );
}
function Product() {
  return (
    <div>
      <h1>product</h1>
      <CustomLink to='/product/123'>商品详情</CustomLink>
      {/* 想要显示详情，详情是子路由  添加 Outlet */}
      <Outlet />
    </div>
  );
}
function ProductDetail() {
  const params = useParams();
  const navigate = useNavigate();
  // console.log(params);
  return (
    <>
      <div>商品详情 - id: {params.id}</div>
      {/* 命令跳转方式 */}
      <button onClick={() => navigate('/')}>go Home</button>
    </>
  );
}

function RequiredAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.user) {
    return <Navigate to={'/login'} state={{ from: location }} replace={true} />;
  }
  return children;
}

function User() {
  const auth = useAuth();
  const navigate = useNavigate();
  console.log(auth, 'auth');
  return (
    <div>
      <h1>User</h1>
      <p>{auth.user?.username}</p>
      <button
        onClick={() => {
          auth.signout(() => navigate('/login'));
        }}
      >
        退出登录
      </button>
    </div>
  );
}

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/';

  if (auth.user) {
    return <Navigate to={from} />;
  }

  const submit = (e) => {
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username');
    auth.signin({ username }, () => {
      navigate(from, { replace: true });
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <input type='text' name='username' />
        <button type='submit'>login</button>
      </form>
    </div>
  );
}

function NoMatch(params) {
  return <div>No found</div>;
}
export default App;
