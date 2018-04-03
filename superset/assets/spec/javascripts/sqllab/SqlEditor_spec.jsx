import React from 'react';
import { shallow } from 'enzyme';
import { describe, it } from 'mocha';
import { expect } from 'chai';

import { defaultQueryEditor, initialState, queries, table } from './fixtures';
import LimitControl from '../../../src/SqlLab/components/LimitControl';
import SqlEditor from '../../../src/SqlLab/components/SqlEditor';
import SqlEditorLeftBar from '../../../src/SqlLab/components/SqlEditorLeftBar';

describe('SqlEditor', () => {
  const mockedProps = {
    actions: {},
    database: {},
    queryEditor: initialState.queryEditors[0],
    latestQuery: queries[0],
    tables: [table],
    queries,
    getHeight: () => ('100px'),
    editorQueries: [],
    dataPreviewQueries: [],
  };
  it('is valid', () => {
    expect(
      React.isValidElement(<SqlEditor {...mockedProps} />),
    ).to.equal(true);
  });
  it('render a SqlEditorLeftBar', () => {
    const wrapper = shallow(<SqlEditor {...mockedProps} />);
    expect(wrapper.find(SqlEditorLeftBar)).to.have.length(1);
  });
  it('render a LimitControl with no limit', () => {
    const wrapper = shallow(<SqlEditor {...mockedProps} />);
    expect(wrapper.find(LimitControl)).to.have.length(1);
    expect(wrapper.find(LimitControl).props().value).to.equal(0);
  });
  it('render a LimitControl with default limit', () => {
    const queryLimit = 101;
    const updatedProps = { ...mockedProps, defaultQueryLimit: queryLimit };
    const wrapper = shallow(<SqlEditor {...updatedProps} />);
    expect(wrapper.find(LimitControl)).to.have.length(1);
    expect(wrapper.find(LimitControl).props().value).to.equal(queryLimit);
  });
  it('render a LimitControl with existing limit', () => {
    const queryEditor = { ...defaultQueryEditor, queryLimit: 101 };
    const updatedProps = { ...mockedProps, queryEditor };
    const wrapper = shallow(<SqlEditor {...updatedProps} />);
    expect(wrapper.find(LimitControl)).to.have.length(1);
    expect(wrapper.find(LimitControl).props().value).to.equal(queryEditor.queryLimit);
  });
});
