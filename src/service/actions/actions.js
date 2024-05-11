import * as types from '../constants';

export const setJobData = (data) => ({
    type: types.SET_JOB_DATA,
    payload: data,
});
  
export const setLoading = (isLoading) => ({
    type: types.SET_LOADING,
    payload: isLoading,
});
  
export const setStartIndex = (index) => ({
    type: types.SET_START_INDEX,
    payload: index,
});
  
export const setHasMore = (hasMore) => ({
    type: types.SET_HAS_MORE,
    payload: hasMore,
});
  
export const setSelectedMinExp = (minExp) => ({
    type: types.SET_SELECTED_MIN_EXP,
    payload: minExp,
});

export const setSelectedCompany = (company) => ({
    type: types.SET_SELECTED_COMPANY,
    payload: company,
});

export const setSelectedLocation = (location) => ({
    type: types.SET_SELECTED_LOCATION,
    payload: location,
});

export const setSelectedWorkMode = (mode) => ({
    type: types.SET_SELECTED_WORK_MODE,
    payload: mode,
});

export const setSelectedRole = (role) => ({
    type: types.SET_SELECTED_ROLE,
    payload: role,
});

export const setSelectedMinPay = (pay) => ({
    type: types.SET_SELECTED_MIN_PAY,
    payload: pay,
});