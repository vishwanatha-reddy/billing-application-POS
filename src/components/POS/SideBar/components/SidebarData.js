import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';


export const SidebarData = [

  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Products',
    path: '/products',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Customers',
    path: '/customers',
    icon: <BsIcons.BsFillPeopleFill />,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <BsIcons.BsFillPersonCheckFill />,
    cName: 'nav-text'
  },
  {
    title: 'Billing',
    path: '/billing',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: '',
    path: '/login',
    icon: '',
    cName: 'nav-text'
  }
  
];
