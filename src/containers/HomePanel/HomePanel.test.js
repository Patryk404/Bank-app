import React from 'react';
import {configure, mount, render, shallow} from 'enzyme';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer'; 
import HomePanel from './HomePanel';
import Modal from '../../components/UI/Modal/Modal';
import Login from '../../components/Login/Login';
import SignUp from '../../components/Signup/Signup';
import Button from '../../components/UI/Button/Button';
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

configure({adapter: new Adapter()});

describe('<HomePanel />',()=>{
    let wrapper;
    let store;
    beforeEach(()=>{
        store= mockStore({
            store: 'dummy'
        });
        wrapper = mount(<Provider store={store}><HomePanel/></Provider>);
        //wrapper = renderer.create(<HomePanel/>);
    });

    it('matches snapshot',()=>{
        wrapper = renderer.create(<Provider store={store}><HomePanel/></Provider>).toJSON();
        expect(wrapper).toMatchSnapshot();
    });

    it('if we click login button we can show our modal with form',()=>{
        const button = wrapper.find(Button).first();
       expect(button.text()).toEqual('Log in');
       button.simulate('click');
       const login = wrapper.find(Login);
        expect(login).toHaveLength(1);
    })

    it('if we click signup button we can show our modal with form',()=>{
        const button = wrapper.find(Button).at(1);
        expect(button.text()).toEqual('Register');
        button.simulate('click');
        const Signup = wrapper.find(SignUp)
        expect(Signup).toHaveLength(1);
    });
    it('should not render login',()=>{
        expect(wrapper.find(Login)).toHaveLength(0);
    });
    it('should not render signup',()=>{
        expect(wrapper.find(SignUp)).toHaveLength(0);
    });
});

