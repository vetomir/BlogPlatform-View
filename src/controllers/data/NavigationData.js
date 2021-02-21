import React from "react";
import {AiFillAlert, AiFillCamera, AiFillCarryOut, AiFillCiCircle} from "react-icons/ai";


export const NavigationData= [
    {
        title: 'HomePage',
        path: '/',
        icon: <AiFillAlert/>,
        cName: 'nav-text'
    },
    {
        title: 'Search',
        path: '/search',
        icon: <AiFillCarryOut/>,
        cName: 'nav-text'
    },
    {
        title: 'Login',
        path: '/login',
        icon: <AiFillCiCircle/>,
        cName: 'nav-text'
    },
    {
        title: 'Register',
        path: '/register',
        icon: <AiFillCamera/>,
        cName: 'nav-text'
    },
]
