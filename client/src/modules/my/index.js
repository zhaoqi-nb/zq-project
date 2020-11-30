export default {
  namespace: 'my',

  state: {
    downloadList: [],
    total: undefined,
  },

  effects: {
    //
    // *getUsersInOrgHasMaxPermission({ payload }, { call, put }) {
    //   const { response } = yield call(getUsersInOrgHasMaxPermission, payload);
    //   if (response) {
    //     yield put({
    //       type: 'save',
    //       payload: {
    //         consultUsers: response.slice(0, 5),
    //       },
    //     });
    //   }
    // },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
