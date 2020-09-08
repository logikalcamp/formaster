import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './components/router'
import {RecoilRoot} from 'recoil'
function App() {
  return (
    <RecoilRoot>
      <AppRouter/>
    </RecoilRoot>
  );
}

export default App;
