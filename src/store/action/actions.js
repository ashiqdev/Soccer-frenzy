import { GET_TEAMS } from './actionTypes';

export const getTeamsAction = (teams) => {
  return {
    type: GET_TEAMS,
    payload: teams,
  };
};

