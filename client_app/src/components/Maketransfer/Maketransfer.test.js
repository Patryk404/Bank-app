import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MakeTransfer from './Maketransfer';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import Input from '@material-ui/core/Input';
import React from 'react';

configure({adapter: new Adapter()});

describe('<MakeTransfer/>',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<MakeTransfer/>)
    });

    it('should render spinner while loading component',()=>{
        wrapper.setProps({loading: true});
        expect(wrapper.find(Spinner)).toHaveLength(1);
    });
    it('should render a inputs fields and labels when he mounted',()=>{
        wrapper.setProps({message: '', making_transfer: true}); 
        //const shit = wraper.find('p').text();
        expect(wrapper.find('div')).toHaveLength(1);
        //expect(wrapper.find('label')).toHaveLength(2);
        expect(wrapper.find(Input)).toHaveLength(2);
        expect(wrapper.find(Button)).toHaveLength(1);
    });
    it('should render a error when paragraph when this is occured',()=>{
        wrapper.setProps({error: true, message: '', making_transfer: true});
        expect(wrapper.find('p').text()).toEqual("Oh sorry you haven't got any cash or we can't find the appropriate bill");
    });
        
});