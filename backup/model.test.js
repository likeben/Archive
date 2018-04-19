import { call, put } from 'redux-saga/effects';
import model from './budgetItem';
import { Dictionary } from '../utils/utils';
import {
  queryList,
  createItem,
} from '../services/budgetItem';

const {
  effects: {
    fetch,
    add,
  },
} = model;


describe('Model BudgetItem Test', () => {
  it('effects fetch should work correctly', () => {
    const mockResult = { rawData: [], treeData: [] };
    const dictionary = new Dictionary(...Object.values(mockResult));

    const gen = fetch({}, { call, put });
    expect(gen.next().value).toEqual(call(queryList));
    expect(gen.next(mockResult).value).toEqual(put({
      type: 'save',
      payload: { items: dictionary },
    }));
    expect(gen.next()).toEqual({
      done: true,
      value: undefined,
    });
  });
  it('effects add should work correctly', () => {
    const payload = { item: {} };
    const gen = add({ payload }, { call, put });
    expect(gen.next().value).toEqual(call(createItem, payload.item));
    expect(gen.next().value).toEqual(put({ type: 'fetch' }));
    expect(gen.next()).toEqual({
      done: true,
      value: undefined,
    });
  });
});
