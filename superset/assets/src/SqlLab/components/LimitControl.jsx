import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Label,
  FormGroup,
  FormControl,
  Overlay,
  Popover,
} from 'react-bootstrap';
import ControlHeader from '../../explore/components/ControlHeader';
import { t } from '../../locales';

const propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  value: 0,
};

export default class LimitControl extends React.PureComponent {
  constructor(props) {
    super(props);
    const { value } = props;
    this.state = {
      textValue: value.toString(),
      showOverlay: false,
    };
  }

  setValueAndClose(val) {
    this.setState({ textValue: val }, this.submitAndClose.bind(this));
  }

  submitAndClose() {
    const value = parseInt(this.state.textValue, 10) || 0;
    this.props.onChange(value);
    this.setState({ showOverlay: false });
  }

  isValidLimit(limit) {
    return !(isNaN(limit) || parseInt(limit, 10) < 0);
  }

  handleToggle() {
    this.setState({ showOverlay: !this.state.showOverlay });
  }

  handleHide() {
    this.setState({ showOverlay: false });
  }

  renderPopover() {
    const textValue = this.state.textValue;
    const isValid = this.isValidLimit(textValue);
    return (
      <Popover id="sqllab-limit-results">
        <div style={{ width: '100px' }}>
          <ControlHeader
            label={t('Row limit')}
            validationErrors={!isValid ? [t('Row limit must be positive integer.')] : []}
          />
          <FormGroup>
            <FormControl
              type="text"
              value={textValue}
              placeholder={t('No limit')}
              bsSize="small"
              onChange={e => this.setState({ textValue: e.target.value })}
            />
          </FormGroup>
          <div className="clearfix">
            <Button
              bsSize="small"
              bsStyle="primary"
              className="float-left ok"
              disabled={!isValid}
              onClick={this.submitAndClose.bind(this)}
            >
              Ok
            </Button>
            <Button
              bsSize="small"
              className="float-right clear"
              onClick={this.setValueAndClose.bind(this, '')}
            >
              clear
            </Button>
          </div>
        </div>
      </Popover>
    );
  }

  render() {
    return (
      <div>
        <Label
          style={{ cursor: 'pointer' }}
          onClick={this.handleToggle.bind(this)}
        >
          LIMIT {this.props.value || '∞'}
        </Label>
        <Overlay
          rootClose
          show={this.state.showOverlay}
          onHide={this.handleHide.bind(this)}
          trigger="click"
          placement="right"
          target={this}
        >
          {this.renderPopover()}
        </Overlay>
      </div>
    );
  }
}

LimitControl.propTypes = propTypes;
LimitControl.defaultProps = defaultProps;
