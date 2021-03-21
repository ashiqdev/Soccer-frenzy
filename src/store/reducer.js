import { GET_TEAMS } from './action/actionTypes';

const reducer = (state = [], action) => {
  console.log({ jasmine: action.payload });
  switch (action.type) {
    case GET_TEAMS:
      return {
        ...state,
        teams: [...action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
