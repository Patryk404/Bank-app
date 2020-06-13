import React from 'react';
import Logo from '../../components/Logo/Logo';
import Aux from '../Auxiliary/Auxiliary';
const layout = (props)=>{
    return(
        <Aux>
            <Logo />
            {props.children}
        </Aux>
    );
}; 

export default layout;