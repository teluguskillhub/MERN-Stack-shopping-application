import React,{Fragment} from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <Fragment>
            <div style={{"marginTop":"70px"}}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-bottom">
            <div className="container">
                <Link className="navbar-brand mr-auto ml-auto" >Shopping App &copy; 2021</Link>
            </div>
            </nav>
            </div>
        </Fragment>
    )
}

export default Footer;