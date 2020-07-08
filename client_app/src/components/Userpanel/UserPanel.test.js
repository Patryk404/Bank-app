import UserPanel from './UserPanel';
import HistoryTransfers from '../Userpanel/HistoryTransfers/HistoryTransfers';
import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Layout from '../../hoc/Layout/Layout';
import Informations from '../../components/Userpanel/Informations/Informations';
import MakeTransfer from './Maketransfer/Maketransfer';

import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Modal from '../UI/Modal/Modal';

configure({adapter: new Adapter});

describe('<UserPanel />',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<UserPanel/>);
        localStorage.setItem('token','6845976957468945');
    })

    it('should render a UserPanel component approprietly',()=>{
        expect(wrapper).toMatchSnapshot();
    });

    it('should render <HistoryTransfers> component',()=>{
        wrapper.setState({loggedUser:{
            transfers:[]
        }});
        expect(wrapper.find(HistoryTransfers)).toHaveLength(1);
    });
    it('should render modal with MakeTransfer if we click into button ',()=>{
        wrapper.setState({showMakeTransfer: false});
        expect(wrapper.state().showMakeTransfer).toEqual(false);
        wrapper.instance().makeTransferButtonHandler();
        expect(wrapper.state().showMakeTransfer).toEqual(true);
        expect(wrapper.find(Modal)).toHaveLength(1);
    })
    it('should not render modal if we not click on button make_transfer',()=>{
        wrapper.setState({showMakeTransfer: false});
        expect(wrapper.find(Modal)).toHaveLength(0); 
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
    it('should not render <MakeTransfer> component',()=>{
        expect(wrapper.find(MakeTransfer)).toHaveLength(0);
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