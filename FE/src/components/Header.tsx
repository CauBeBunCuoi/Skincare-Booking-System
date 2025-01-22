import React from 'react'
import './HeaderComponent.css'
import { FaRegUserCircle } from 'react-icons/fa'

export const Header = () => {
  return (
    <div className='header-container'>  
        <div className='header-logo'>Skincare</div>
        <div>
            <ul className='header-list'>
                <li className='header-list-content'>Home</li>
                <li className='header-list-content'>About</li>
                <li className='header-list-content'>Booking</li>
                <li className='header-list-content'>Contact</li>
            </ul>
        </div>
        <div className='user-login'>
            <div>
              <FaRegUserCircle size={25} className='user-profile-icon'/>
            </div>
        </div>  
    </div>
  )
}
