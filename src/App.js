import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Login from './Login';
import Signup from './Signup';
import Users from './Users';

import usersContext from './contexts/usersContext';
import axiosWithAuth from './axiosWithAuth';

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axiosWithAuth()
    .get('/users?page=1')
    .then(res => {
      console.log(res)
      setUsers(res.data.data)
    })
    .catch(err => console.log(err))
  }, [])
  return (
    <div className="App">
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <usersContext.Provider value={users}>
          <Route path='/users' component={Users} />
        </usersContext.Provider>
    </div>
  );
}

export default App;
