import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer'; 
import HomePanel from './HomePanel';
import Modal from '../UI/Modal/Modal';
import Login from './Login/Login';
import SignUp from './Signup/Signup';
import Button from '../UI/Button/Button';

configure({adapter: new Adapter});

describe('<HomePanel />',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = mount(<HomePanel/>);
    });

    it('matches snapshot',()=>{
        wrapper = renderer.create(<HomePanel/>).toJSON();
        expect(wrapper).toMatchSnapshot();
    });

    it('if we click login button we can show our modal with form',()=>{
       const button = wrapper.find(Button).first();
       expect(button.text()).toEqual('Log in'); 
       button.simulate('click'); 
       const modal = wrapper.find(Modal).first();
       expect(modal.props().show).toEqual(true);
       expect(modal.find(Login)).toHaveLength(1);
       //console.log(button.debug());
    })

    it('if we click signup button we can show our modal with form',()=>{
        const button = wrapper.find(Button).at(2);
        expect(button.text()).toEqual('Register');
        button.simulate('click');
        const modal = wrapper.find(Modal).at(1);
        expect(modal.props().show).toEqual(true);
        expect(modal.find(SignUp)).toHaveLength(1);
    });
});

