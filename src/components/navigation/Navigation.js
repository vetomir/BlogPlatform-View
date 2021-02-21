import styled from "styled-components";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {NavigationData} from "../../controllers/data/NavigationData";
import {colors} from "../utils/Colors";
import {CgCloseR} from "react-icons/cg";
import {RiMenu4Line} from "react-icons/ri";

function Navigation(){
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)

    return(
        <Wrapper>
            <div className='navbar'>
                <Link to="#" className='menu-bars'>
                    <RiMenu4Line onClick={showSidebar}/>
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <CgCloseR/>
                        </Link>
                    </li>
                    {NavigationData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
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
      }
      .menu-bars {
        margin-left: 1rem;
        font-size: 2rem;
        background: none;
        color: ${colors.white};
        &:hover{
          transition: 500ms;
          color: ${colors.orange};
        }
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
        list-style: none;
      }
      .nav-text a{
        text-decoration: none;
        color: #ddd;
        font-weight: 600;
        font-size: 18px;
        width: 95%;
        padding: 1rem 2rem;
        margin: 0 1rem 1rem 1rem;
        height: 100%;
        display: flex;
        align-items: center;
        border-radius: 10px;
      }
      .nav-text a:hover{
        background-color: ${colors.orange};
        color: white;
      }
      .nav-menu-items {
        width: 100%;
        padding: 0;
        a{color: ${colors.white};}
      }

      .navbar-toggle {
        width: 100%;
        margin: 2rem 0;
        display: flex;
        justify-content: start;
        align-items: center;
      }
`;
