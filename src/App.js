import React, { useEffect } from 'react';
import './App.css';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Mail from './components/body/Mail';
import EmailList from './components/body/EmailList';
import { useDispatch, useSelector } from 'react-redux';
import SendMail from './components/send_mail/SendMail';
import { selectSendMessageIsOpen } from './features/mailSlice';
import { login, logout, selectUser } from './features/userSlice';
import Login from './components/login/Login';
import { authentication } from './firebase/Firebase';

function App() {

  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    authentication.onAuthStateChanged(
      (user) => {
        if (user) {
          console.log('User is logged in: ', user.displayName);
          dispatch(
            login(
              {
                displayName: user.displayName,
                email: user.email,
                photoUrl: user.photoURL,
              }
            )
          );
        } else {
          console.log('User logged out');
          dispatch(logout());
        }
      }
    )

  }, [dispatch]);

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="app">
          <Header />

          <div className="app__body">
            <Sidebar />
            <Routes>
              <Route path="/mail" element={<Mail />} />
              <Route path="/" element={<EmailList />} />
            </Routes>
          </div>

          {sendMessageIsOpen && <SendMail />}
        </div>
      )}
    </Router>
  );
}

export default App;
