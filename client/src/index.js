import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthService from './service/auth';
import TweetService from './service/tweet';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthErrorEventBus } from './context/AuthContext';
import HttpClinet from './network/http';
import TokenStorage from './db/token';
import socket from 'socket.io-client';

const baseURL = process.env.REACT_APP_BASE_URL;
const httpClient = new HttpClinet(baseURL);
const tokenStorage = new TokenStorage();
const authErrorEventBus = new AuthErrorEventBus();
const authService = new AuthService(httpClient, tokenStorage);
const tweetService = new TweetService(httpClient, tokenStorage);

const socketIO = socket(baseURL);
socketIO.on('connect_error', error => {
  console.log('socket error', error);
});
socketIO.on('dwitter', msg => console.log(msg));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
        authService={authService}
        authErrorEventBus={authErrorEventBus}
      >
        <App tweetService={tweetService} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
