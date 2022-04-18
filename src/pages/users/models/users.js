import * as usersService from '../services/users';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    page: 1
  },
  reducers: {
    save(state, {payload: {data: list}}) {
      return {...state, list: list.data, total: parseInt(list.headers['x-total-count'])}
    }
  },
  effects: {
    *fetch({payload: { page = 1 }}, {call, put}) {
      const { data }  = yield call(usersService.fetch, {page})
      yield put({type: 'save', payload: {data}})
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if(pathname === '/users') {
          dispatch({type: 'fetch', payload: query})
        }
      })
    }
  }
}
