import React from 'react';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { shallow } from 'enzyme';

import { Label, Popover, Tooltip } from 'react-bootstrap';
import LimitControl from '../../../src/SqlLab/components/LimitControl';

describe('LimitControl', () => {
  const defaultProps = {
    value: 0,
    onChange: () => {},
  };

  let wrapper;
  const factory = o => <LimitControl {...o} />;
  beforeEach(() => {
    wrapper = shallow(factory(defaultProps));
  });
  it('is a valid element', () => {
    expect(React.isValidElement(<LimitControl {...defaultProps} />)).to.equal(true);
  });
  it('renders a Label', () => {
    expect(wrapper.find(Label)).to.have.length(1);
  });
  it('loads the correct state', () => {
    const value = 100;
    wrapper = shallow(factory({ value, onChange: defaultProps.onChange }));
    wrapper.find(Label).first().simulate('click');
    setTimeout(() => {
      expect(wrapper.find(Tooltip)).to.have.length(0);
      expect(wrapper.state().textValue).to.equal(value.toString());
    }, 10);
  });
  it('handles invalid value', () => {
    wrapper.find(Label).first().simulate('click');
    wrapper.setState({ textValue: 'invalid' });
    setTimeout(() => {
      expect(wrapper.find(Tooltip)).to.have.length(1);
    }, 10);
  });
  it('opens and closes', () => {
    wrapper.find(Label).first().simulate('click');
    setTimeout(() => {
      expect(wrapper.find(Popover)).to.have.length(1);
      expect(wrapper.find('.ok')).first().simulate('click');
      setTimeout(() => {
        expect(wrapper.find(Popover)).to.have.length(0);
      }, 10);
    }, 10);
  });
  it('sets clear and closes', () => {
    const value = 100;
    wrapper = shallow(factory({ value, onChange: defaultProps.onChange }));
    wrapper.find(Label).first().simulate('click');
    setTimeout(() => {
      expect(wrapper.state().textValue).to.equal(value.toString());
      expect(wrapper.find('.clear')).first().simulate('click');
      setTimeout(() => {
        expect(wrapper.state().textValue).to.equal('');
      }, 10);
    }, 10);
  });
});
