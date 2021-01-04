import React from 'react'
import { Link } from "react-router-dom"
import './css/homepage.css'
import Header from './header'
const Homepage = () => {


    return (
        <div className="homepage">
            <Header />
            <h1 className="trademark display-1">GHOSTED</h1>
            <Link to="/register"><button className="btn btn-danger btn-lg position_center register">CREATE ACCOUNT</button></Link>
            
        </div>
    )
}

export default Homepage