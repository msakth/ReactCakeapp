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

import App from '../App';
import CakeList from '../CakeList';

describe('<App/>', function () {

    it('App Component Smoke Test', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });

    it('should contain a child <CakeList/> component', () => {
        const wrapper = mount(<App/>);
        expect(wrapper.find(CakeList)).to.have.length(1);
    });

});
