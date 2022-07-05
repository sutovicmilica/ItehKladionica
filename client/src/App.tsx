import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useGet from './hooks/useGet';
import { Container, FlexboxGrid } from 'rsuite';
import { LoginUser, RegisterUser, User } from './types';
import Register from './auth/Register';
import axios from 'axios';
import Login from './auth/Login';
import AdminNavbar from './admin/AdminNavbar';
import GamesPage from './admin/GamesPage';
import QuotasPage from './admin/QuotasPage';
function App() {

  const {
    data: user,
    setData: setUser,
    loading,
  } = useGet<User>('/user');

  if (loading) {
    return null;
  }
  const login = async (u: Partial<LoginUser>) => {
    const res = await axios.post('/login', u);
    localStorage.setItem('auth-token', res.data.token);
    axios.defaults.headers.common.authorization = 'Bearer ' + res.data.token
    setUser(res.data);
  }
  const register = async (u: Partial<RegisterUser>) => {
    const res = await axios.post('/register', u);
    localStorage.setItem('auth-token', res.data.token)
    axios.defaults.headers.common.authorization = 'Bearer ' + res.data.token
    setUser(res.data);
  }

  if (!user) {
    return (
      <BrowserRouter>
        <Container className='container'>
          <FlexboxGrid className='content' justify='space-between'>
            <FlexboxGrid.Item style={{ height: '100vh' }} colspan={15}>
              <img style={{ height: '100%' }} width='100%' alt='Chat' src='https://football-talk.co.uk/wp-content/uploads/2020/05/betting-image.jpg' />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item style={{ padding: '20px' }} colspan={9}>
              <Routes>
                <Route path='/register' element={<Register onSubmit={register} />} />
                <Route path='*' element={<Login onSubmit={login} />} />
              </Routes>
            </FlexboxGrid.Item>

          </FlexboxGrid>
        </Container>
      </BrowserRouter>
    );
  }

  const onLogout = () => {
    localStorage.removeItem('auth-token');
    delete axios.defaults.headers.common.authorization;
    setUser(undefined);
  }

  if (user.type === 'admin') {
    return (
      <BrowserRouter>
        <div className='container'>
          <AdminNavbar user={user} onLogout={onLogout} />
          <div className='admin-main content'>
            <Routes>
              <Route path='/' element={(<div>fdsg</div>)} />
              <Route path='/game' element={(<GamesPage />)} />
              <Route path='/quota' element={(<QuotasPage />)} />
            </Routes>

          </div>
        </div>
      </BrowserRouter>
    )
  }
  return null;
}

export default App;
