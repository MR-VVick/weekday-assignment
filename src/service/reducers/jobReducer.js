import * as types from '../constants';

const initialState = {
  jobData: [],
  loading: false,
  startIndex: 0,
  hasMore: true,
  selectedMinExp: 0,
  selectedMinPay: 0,
  selectedRole: null,
  selectedCompany: '',
  selectedWorkMode: null,
  selectedLocation: null,
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_JOB_DATA:
      return { ...state, jobData: action.payload };
    case types.SET_LOADING:
      return { ...state, loading: action.payload };
    case types.SET_START_INDEX:
      return { ...state, startIndex: action.payload };
    case types.SET_HAS_MORE:
      return { ...state, hasMore: action.payload };
    case types.SET_SELECTED_MIN_EXP:
      return { ...state, selectedMinExp: action.payload };
    case types.SET_SELECTED_COMPANY:
      return { ...state, selectedCompany: action.payload };  
    case types.SET_SELECTED_ROLE:
      return { ...state, selectedRole: action.payload };  
    case types.SET_SELECTED_LOCATION:
      return { ...state, selectedLocation: action.payload };   
    case types.SET_SELECTED_MIN_PAY:
      return { ...state, selectedMinPay: action.payload }; 
    case types.SET_SELECTED_WORK_MODE:
      return { ...state, selectedWorkMode: action.payload };        
    default:
      return state;
  }
};

export default jobReducer;
