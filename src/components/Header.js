import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DialpadOutlinedIcon from '@mui/icons-material/DialpadOutlined';
import { Avatar } from '@mui/material';
import './Header.css'
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { auth } from '../firebase/firebase';


function Header() {
    const user = useSelector(selectUser)

    const handleSignOut = () =>{
        auth.signOut()
        window.location.reload()
    }

    return(
        <div className='header'>
            <div className='header__left'>
                <MenuIcon />
                <img src="https://www.nicepng.com/png/detail/207-2076661_email-logo-transparent-www-mail-logo-png-transparent.png" alt="logo" />
                <h1 style={{marginLeft:"10px",color:"white",fontSize:"26px",fontWeight:"500"}}>Mail</h1>
            </div>
            <div className='header__middle'>
                <div className='header__SearchContainer'>
                    <SearchIcon />
                    <input type="text" placeholder='Search mail' />
                    <ArrowDropDownIcon />
                </div>

            </div>
            <div className='header__right'>
                <div className='header__rightIcons'>
                    <HelpOutlineIcon />
                    <SettingsOutlinedIcon />
                    <DialpadOutlinedIcon />
                </div>
                <div className='header__Avatar' style={{cursor:'pointer'}}>
                    <Avatar src={user.photo}  onClick={handleSignOut} />
                </div>
            </div>
        </div>
    )
    
}

export default Header
