import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HistoryTransfers from './HistoryTransfers';
import HistoryTransfer from './HistoryTransfer/HistoryTransfer';

configure({adapter: new Adapter}); 

describe('<HistoryTransfers/>', ()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<HistoryTransfers/>);
    });

    it('should render our transfer history',()=>{
        wrapper.setProps({history: ['niggalamp','OSHIT','HEREWEGOAGAIN']});
        expect(wrapper.find(HistoryTransfer)).toHaveLength(3);
    });

    it('should render null if we not transfer history',()=>{
        expect(wrapper.find(HistoryTransfer)).toHaveLength(0);
    });
});