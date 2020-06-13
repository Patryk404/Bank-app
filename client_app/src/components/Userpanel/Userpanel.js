import React, {Component} from 'react';
import Button from '../UI/Button/Button';
import Aux from '../../hoc/Auxiliary/Auxiliary';
class Userpanel extends Component { 
    render(){
        return(
            <Aux>
                <Button>Log in</Button>
                <Button>Register</Button>
            </Aux>
        );
    }
}

export default Userpanel;