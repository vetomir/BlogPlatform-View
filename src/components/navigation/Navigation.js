import styled from "styled-components";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {FaBars} from "react-icons/fa";
import {AiOutlineClose} from "react-icons/ai";
import {NavigationData} from "../../controllers/data/NavigationData";
import {colors} from "../utils/Colors";

const Wrapper = styled.div`
      .navbar {
        position: fixed;
        top: 1rem;
        left: 0;
        height: 60px;
        z-index: 10;
        display: flex;
        justify-content: start;
        align-items: center;
       a{color: ${colors.white};} 
      }
      .menu-bars {
        margin-left: 2rem;
        font-size: 2rem;
        background: none;
      }
      .nav-menu {
        z-index: 999;
        background-color: #121219;
        width: 250px;
        height: 100vh;
        justify-content: center;
        position: fixed;
        top: 0;
        left: -100%;
        transition: 850ms;
        box-shadow: 0 1rem 5rem black;
      }
      .nav-menu.active{
        left: 0;
        transition: 350ms;
      }
      .nav-text{
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 8px 0 8px 16px;
        list-style: none;
        height: 60px;
      }
      .nav-text a{
        text-decoration: none;
        color: #ddd;
        font-weight: 600;
        font-size: 18px;
        width: 95%;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 16px;
      }
      .nav-text a:hover{
        background-color: #f3d250;
        color: white;
      }
      .nav-menu-items {
        width: 100%;
        padding: 0;
        a{color: ${colors.white};}
      }

      .navbar-toggle {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: start;
        align-items: center;
      }
`;

function Navigation(){
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)

    return(
        <Wrapper>
            <div className='navbar'>
                <Link to="#" className='menu-bars'>
                    <FaBars onClick={showSidebar}/>
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiOutlineClose/>
                        </Link>
                    </li>
                    {NavigationData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </Wrapper>
    )
}
export default Navigation;
