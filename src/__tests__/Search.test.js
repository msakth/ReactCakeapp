import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import chaiJsx from 'chai-jsx';
import {jsdom} from 'jsdom';

chai.use(chaiEnzyme());
chai.use(chaiJsx);

import React from 'react';
import ReactDOM from 'react-DOM';
import {mount, render, shallow} from 'enzyme';
import {expect} from 'chai';

import expectFromExpect from 'expect';

import Search from '../Search';

describe('<Search/>', function () {

    it('Search component Smoke Test', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Search />, div);
    });

    it('should have props for UpdateCakes', () => {
        const wrapper = shallow(<Search/>);
        expect(wrapper.props().updateCakes).to.be.defined;        
    });

    it('Search component have className form-group', () => {
        const wrapper = shallow(<Search/>);
        expect(wrapper.hasClass('form-group')).to.equal(true);
    });

    it('should have an input for searching cakes', () => {
        const wrapper = shallow(<Search/>);
        expect(wrapper.find('input')).to.have.length(1);
    });

    it('input have className form-control', () => {
        const wrapper = shallow(<Search/>);
        expect(wrapper.find('input').hasClass('form-control')).to.equal(true);
    });
    
    it('Check UpdateCake method called when user searches for cake', () => {
        
        const spy = expectFromExpect.spyOn(Search.prototype, "updateCake");
       
        const wrapper = shallow(<Search/>);
        
        expectFromExpect(spy).toNotHaveBeenCalled();

        wrapper.find('input').simulate('change', {target: {value: 'cheese cake'}});

        expectFromExpect(spy).toHaveBeenCalled();
    });
});