import React from 'react'
import { css } from '@emotion/react';
import {BounceLoader, BarLoader, ClockLoader, MoonLoader, RingLoader} from 'react-spinners';

import './Home.css';

const loaderCss= css `
margin-top:25px;
margin-bottom:25px;
`

const Spinner = () => {
    return (
        <div className="spinner col-md-4 offset-md-3" >
            <RingLoader size={150} color='black' loading/>
            <h1>Signing you in...</h1>
        </div>
    )
}

export default Spinner
