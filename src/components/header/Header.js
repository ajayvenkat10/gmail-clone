import React from 'react'
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, IconButton } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { signOut } from "firebase/auth";
import { authentication } from '../../firebase/Firebase';
import { logout } from '../../features/userSlice';

function Header() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const logoutOfApp = () => {
    signOut(authentication).then(
      () => {
        dispatch(logout());
      }
    )
  };

  return (
    <div className="header">
      
      <div className="header__left">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <img src="https://cdn.vox-cdn.com/thumbor/Tbqi3ZF9Qz0fTJIUvkgQe3FdN0k=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/21939811/newgmaillogo.jpg" 
            alt="Google Logo" />
      </div>

      <div className="header__middle">
        <SearchIcon />
        <input type="text" placeholder="Search email" />
        <ArrowDropDown className='header__inputCaret'/>
      </div>

      <div className="header__right">
        <IconButton>
          <AppsIcon />
        </IconButton>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <IconButton>
          <Avatar src={user?.photoUrl} onClick={logoutOfApp}/>
        </IconButton>
      </div>
    </div>
  )
}

export default Header