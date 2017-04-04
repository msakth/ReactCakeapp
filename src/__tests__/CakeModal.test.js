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

import CakeModal from '../ModalComponents/CakeModal';
import UpsertCake from '../ModalComponents/UpsertCake';

describe('<CakeModal/>', function () {

    it('CakeModal component Smoke Test', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CakeModal/>, div);
    });

    it('should have props for showModal,hideModal,handleOnUpsertCake,cake,modalTitle', () => {
        const wrapper = shallow(<CakeModal/>);
        expect(wrapper.props().showModal).to.be.defined;      
        expect(wrapper.props().hideModal).to.be.defined;
        expect(wrapper.props().handleOnUpsertCake).to.be.defined;
        expect(wrapper.props().cake).to.be.defined;
        expect(wrapper.props().modalTitle).to.be.defined;
    });

    it('should have a button to close the cake modal', () => {
        const wrapper = shallow(<CakeModal/>);
        expect(wrapper.find('Button')).to.have.length(1);
    });

    it('should contain a child <UpsertCake/> component', function () {
        const wrapper = shallow(<CakeModal/>);
        expect(wrapper.find(UpsertCake)).to.have.length(1);
    });
});