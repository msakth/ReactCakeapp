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

import CakeList from '../CakeList';
import Search from '../Search';
import Cake from '../Cake';
import CakeModal from '../ModalComponents/CakeModal.js'


describe('<CakeList/>', function () {

    let cakes = new Array();
    cakes.push(new Object({ title: "cheese", desc: "Cheese Cake", image : '1.jpg' }));
    cakes.push(new Object({ title: "carrot", desc: "Carrot Cake", image : '2.jpg' }));
    cakes.push(new Object({ title: "vanilla", desc: "Vanilla Cake", image : '3.jpg' }));

    it('CakeList component Smoke Test', () => {
        const source = 'https://mySource.json';
        const div = document.createElement('div');
        ReactDOM.render(<CakeList source={source}/>, div);
    });

    it('should have called componentDidMount', () => {
        const spy = expectFromExpect.spyOn(CakeList.prototype, 'componentDidMount');            
        const wrapper = mount(<CakeList />);
        expectFromExpect(spy).toHaveBeenCalled();
    });

    it('should have called componentWillUnmount after unmounting CakeList', () => {
        const spy = expectFromExpect.spyOn(CakeList.prototype, 'componentWillUnmount');            
        const wrapper = mount(<CakeList />);
        wrapper.unmount();
        expectFromExpect(spy).toHaveBeenCalled();
    });

    it('should have an button to add cake', () => {
        const wrapper = shallow(<CakeList/>);
        expect(wrapper.find('button')).to.have.length(1);
    });
    
    it('showModal state should be true when click add button to add cake',()=> {    
        const wrapper = mount(<CakeList/>);
        wrapper.find('button').simulate('click');
        expect(wrapper.state().showModal).to.be.equal(true);
    });
    
    it('modalTitle state should be Add when adding a cake',()=> {    
        const wrapper = mount(<CakeList/>);
        wrapper.find('button').simulate('click');
        expect(wrapper.state().modalTitle).to.be.equal('Add');
    });

    it('should contain a child <Search/> and <CakeModal/> component', () => {
        const wrapper = mount(<CakeList/>);
        expect(wrapper.find(Search)).to.have.length(1);
        expect(wrapper.find(CakeModal)).to.have.length(1);
    });
    
    it('cake component should have been rendered 3 times for 3 cakes',() => { 
        const wrapper = mount(<CakeList/>);
        wrapper.setState({cakes: cakes, filteredCakes: cakes});
        expect(wrapper.find(Cake)).to.have.length(3);
    });

});