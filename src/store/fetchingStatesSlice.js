import { createSlice } from '@reduxjs/toolkit';

import { trimStart } from 'lodash';
import { useMemo } from 'react';

const sliceName = 'thunkStatuses';

const loadingTypesRegExp = new RegExp('(/pending|/fulfilled|/rejected)$');

/**
 * For all thunks current status is going to be saved here
 * if thunk doesn't have a status - means it wasn't invoked
 * https://github.com/AlexandrKoliukh/redux-boilerplates/blob/master/fetchingStatesSlice.ts
 */
const slice = createSlice({
  name: sliceName,
  reducers: {},
  initialState: {},
  extraReducers: (builder) => builder.addMatcher(
    (action) => loadingTypesRegExp.test(action.type),
    (state, action) => {
      const [match] = action.type.match(loadingTypesRegExp);
      const fetchingStatus = trimStart(match, '/');
      const actionTypePrefix = action.type.replace(loadingTypesRegExp, '');

      /* eslint-disable no-param-reassign */
      state[actionTypePrefix] = fetchingStatus;
      /* eslint-enable no-param-reassign */
    },
  ),
});

export const thunkStatusesSelectors = {
  selectState: (state) => state[sliceName],
  selectByType: (type) => (state) => state[sliceName][type] || 'idle',
};

export const thunkStatusesReducer = slice.reducer;

export const useThunkStatus = (thunkAction) => {
  const actionStatus = thunkStatusesSelectors.selectByType(thunkAction.typePrefix);

  const result = useMemo(() => ({
    actionStatus,
    isPending: actionStatus === 'pending',
    isSuccess: actionStatus === 'fulfilled',
  }), [actionStatus]);

  return result;
};
