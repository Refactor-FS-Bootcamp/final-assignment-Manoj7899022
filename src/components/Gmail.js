import React from 'react'
import Header from './Header'
// import Sidebar from './Sidebar'
// import Widget from './Widget'
import './Gmail.css'
import Sidebar from './Sidebar'
import Mail from './Mail'
import Widget from './Widget'
// import Mail from './Mail'

function Gmail() {
    return(
        <div className='gmail'>
            <Header />
            <div className='gamilBody'>
            <Sidebar />
            <Mail />
            <Widget />
            </div>
        </div>
    )
    
}

export default Gmail