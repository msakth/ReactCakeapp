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

import Cake from '../Cake';

describe('<Cake/>', function () {
    
    const cake = {
        title: 'Strawberry Chocolate cake',
        desc:  'cake made with strawberry',
        image: 'http://omgchocolatedesserts.com/wp-content/uploads/2016/05/Strawberry-Chocolate-Cake-1.jpg'
    }

    it('Cake component Smoke Test', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Cake cake={cake}/>, div);
    });

    it('should have props for editCake, openEditModal', () => {
        const wrapper = shallow(<Cake cake={cake}/>);
        expect(wrapper.props().editCake).to.be.defined;        
        expect(wrapper.props().openEditModal).to.be.defined;  
    });

    it('should have an image for cake', () => {
        const wrapper = shallow(<Cake cake={cake}/>);
        expect(wrapper.find('img')).to.have.length(1);
    });

    it('should have a button to edit cake', () => {
        const wrapper = shallow(<Cake cake={cake}/>);
        expect(wrapper.find('button')).to.have.length(1);
    });

    it('should have called handleOnEdit when edit button clicked', () => {        
        const spy = expectFromExpect.spyOn(Cake.prototype, "handleOnEdit");       
        const wrapper = shallow(<Cake cake={cake}/>);        
        expectFromExpect(spy).toNotHaveBeenCalled();
        wrapper.find('button').simulate("click");
        expectFromExpect(spy).toHaveBeenCalled();
    });
    
    it('check rendered cake values when edit button clicked',() => {
        const wrapper = mount(<Cake cake={cake}/>);

        wrapper.find('button').simulate("click");
    
        const result = wrapper.props().cake;
        expect(result.title).to.be.equal('Strawberry Chocolate cake');
        expect(result.desc).to.be.equal('cake made with strawberry');
        expect(result.image).to.be.equal('http://omgchocolatedesserts.com/wp-content/uploads/2016/05/Strawberry-Chocolate-Cake-1.jpg');
    });

});