import UserPanel from './UserPanel';
import HistoryTransfers from '../../components/HistoryTransfers/HistoryTransfers';
import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Layout from '../../hoc/Layout/Layout';
import Informations from '../../components/Informations/Informations';
import MakeTransfer from '../../components/Maketransfer/Maketransfer';

import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';

configure({adapter: new Adapter});

describe('<UserPanel />',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<UserPanel/>);
        localStorage.setItem('token','6845976957468945');
    })

    it('matches snapshot',()=>{
        wrapper = renderer.create(<UserPanel/>).toJSON();
        expect(wrapper).toMatchSnapshot();
    });

    it('should render <HistoryTransfers> component',()=>{
        wrapper.setState({loggedUser:{
            transfers:[]
        }});
        expect(wrapper.find(HistoryTransfers)).toHaveLength(1);
    });
    it('should render modal with MakeTransfer if we click into button ',()=>{
        expect(wrapper.state().showMakeTransfer).toEqual(false);
        const ButtonComponent = wrapper.find('button').at(1); //selecting second node
        ButtonComponent.props().click();
        //console.log('find button component', ButtonComponent.debug());
        //wrapper.instance().makeTransferButtonHandler();
        expect(wrapper.find(Modal)).toHaveLength(1);
    })
    it('should render a make_transfer modal if we click on button',()=>{
        const button = wrapper.find(Button).at(1).children();
        const our_button_component = wrapper.find(Button).at(1);
        expect(button.text()).toEqual('Make Transfer');
        our_button_component.simulate('click');
        expect(wrapper.find(MakeTransfer)).toHaveLength(1);
    })
    it('should render <Aux> component',()=>{
        expect(wrapper.find(Aux)).toHaveLength(1);
    })
    it('should render <Layout> component',()=>{
        expect(wrapper.find(Layout)).toHaveLength(1);
    })
    it('should render <Informations> component',()=>{
        expect(wrapper.find(Informations)).toHaveLength(1);
    })
    it('should render <MakeTransfer> component if stateshowMakeTransfer is true',()=>
    {
        wrapper.setState({showMakeTransfer: true});
        expect(wrapper.find(MakeTransfer)).toHaveLength(1);
    })
    it('should render h1 if we are not authenticated',()=>{
        localStorage.removeItem('token');
        expect(wrapper.find('h1')).toHaveLength(1);
    })
    
})