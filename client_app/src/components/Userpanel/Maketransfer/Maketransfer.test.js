import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MakeTransfer from './Maketransfer';
import React from 'react';

configure({adapter: new Adapter()});