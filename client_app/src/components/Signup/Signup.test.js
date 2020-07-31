import React from 'react';
import {configure, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import SignUp from './Signup'; 

configure({adapter: new Adapter});

const EXAMPLE_INFO = {
    email: '',
    name: '',
    surname: '',
    login: '',
    password: ''
};

describe('<SignUp/>',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<SignUp user={EXAMPLE_INFO}/>); 
    })

    it('matches snapshot',()=>{
        wrapper = renderer.create(<SignUp user={EXAMPLE_INFO}/>).toJSON();
        expect(wrapper).toMatchSnapshot();
    })

    it('should render a message if we click into button',()=>{
        wrapper.setProps({
            message: 'example'
        });
        expect(wrapper.find('p').text()).toEqual('example');
    });
});