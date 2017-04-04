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

import UpsertCake from '../ModalComponents/UpsertCake';

describe('<UpsertCake/>', function () {

    const cake = {
        title: 'Strawberry Chocolate cake',
        desc:  'cake made with strawberry',
        image: 'http://omgchocolatedesserts.com/wp-content/uploads/2016/05/Strawberry-Chocolate-Cake-1.jpg'
    }

    it('UpsertCake component Smoke Test', () => {
        const div = document.createElement('div');
        ReactDOM.render(<UpsertCake/>, div);
    });

    it('should have an button to save', () => {
        const wrapper = shallow(<UpsertCake/>);
        expect(wrapper.find('button')).to.have.length(1);
    });

    it('should initial state of cake prop is empty when add a cake ', () => {
        const wrapper = mount(<UpsertCake/>);
        expect(wrapper.state().title).to.be.empty;
        expect(wrapper.state().desc).to.be.empty;
        expect(wrapper.state().image).to.be.empty;
    });

    it('should initial state of cake prop is not empty when edit a cake ', () => {
        const wrapper = mount(<UpsertCake cake={cake}/>);
        expect(wrapper.state().title).to.equal('Strawberry Chocolate cake');
        expect(wrapper.state().desc).to.equal('cake made with strawberry');
        expect(wrapper.state().image).to.equal('http://omgchocolatedesserts.com/wp-content/uploads/2016/05/Strawberry-Chocolate-Cake-1.jpg');
    });

    it('should title be disabled when edit a cake ', () => {
        const modalTitle = 'Edit';
        const wrapper = mount(<UpsertCake cake={cake} modalTitle={modalTitle} />);
        expect(wrapper.find('#title')).to.be.disabled()
    });
       
    it('should title be enabled when add a cake ', () => {
        const modalTitle = 'Add';
        const wrapper = mount(<UpsertCake  modalTitle={modalTitle} />);
        expect(wrapper.find('#title')).to.not.be.disabled()
    });

    it('should call componentDidMount', () => {
        const spy = expectFromExpect.spyOn(UpsertCake.prototype, 'componentDidMount');            
        const wrapper = mount(<UpsertCake />);
        expectFromExpect(spy).toHaveBeenCalled();
    });

    it('should call saveCake function when save button clicked',() => {

        const spy = expectFromExpect.spyOn(UpsertCake.prototype, "saveCake");       
        const wrapper = mount(<UpsertCake />);        
        expectFromExpect(spy).toNotHaveBeenCalled();
        wrapper.find('form').simulate("submit");
        expectFromExpect(spy).toHaveBeenCalled();
    });

    it('Check setTitle function called when user types cake title', () => {
        
        const spy = expectFromExpect.spyOn(UpsertCake.prototype, "setTitle");       
        const wrapper = shallow(<UpsertCake/>);        
        expectFromExpect(spy).toNotHaveBeenCalled();
        wrapper.find('#title').simulate('change', {target: {value: 'birthday cake'}});
        expectFromExpect(spy).toHaveBeenCalled();      
    });

    it('Check setDescription function called when user types cake description', () => {
        
        const spy = expectFromExpect.spyOn(UpsertCake.prototype, "setDescription");       
        const wrapper = shallow(<UpsertCake/>);        
        expectFromExpect(spy).toNotHaveBeenCalled();
        wrapper.find('#desc').simulate('change', {target: {value: 'birthday cake'}});
        expectFromExpect(spy).toHaveBeenCalled();      
    });
    
    it('Check setImageUrl function called when user types cake image url', () => {
        
        const spy = expectFromExpect.spyOn(UpsertCake.prototype, "setImageUrl");       
        const wrapper = shallow(<UpsertCake/>);        
        expectFromExpect(spy).toNotHaveBeenCalled();
        wrapper.find('#image').simulate('change', {target: {value: 'https://cake.com/1.jpg'}});
        expectFromExpect(spy).toHaveBeenCalled();      
    });
});