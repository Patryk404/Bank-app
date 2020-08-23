import React from 'react';
import Logo from '../../components/Logo/Logo';
import Aux from '../Auxiliary/Auxiliary';
const layout = (props)=>{//Layoult including logo component
    return(
        <Aux>
            <Logo logged={props.logged}/>
            {props.children}
        </Aux>
    );
}; 

export default layout;