import React from "react"
import SingUpComponent from "../SignUpComponent/SignUpComponent";
import LoginComponent from "../LoginComponent.js/LoginComponent";

const NavComponent = () =>{

    const handleLogout = (user) => {
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                
            };
    return(
        <div>
            <>    

                <nav className='navbar navbar-expand-sm bg-light fixed-top'>
                    <div className='container-fluid'>
                        <h3 className='navbar-text' style={{fontFamily:'cursive'}}>machmoses</h3>
                        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#collapsibleNavbar' aria-controls='collapsibleNavbar' aria-expanded='false' aria-label='Toggle navigation'>
                            <span className='navbar-toggler-icon'></span>
                        </button>
                        <div className='collapse navbar-collapse ' id='collapsibleNavbar'>
                            <ul className='navbar-nav ms-auto flex-column flex-sm-row'>
                                    <li className='nav-item'><a href='#home' className='nav-link active'>home</a></li>
                                    <li className='nav-item'><a href='#work' className='nav-link'>work</a></li>
                                    <li className='nav-item'><a href='#contact' className='nav-link bt bt-bg-primary' >contact</a></li>
                                    <li className='nav-item'><a href='#about' className='nav-link bt bt-bg-primary' >about</a></li>
                                    <li className='nav-item'><a href='#login' className='nav-link' onClick={(e) => {e.preventDefault(); handleLogout();}}>Logout</a></li>
                            </ul>
                        </div>
                        
                    </div>
                </nav>
            </>
            
        </div>
    );
}

export default NavComponent;