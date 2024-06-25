import {INITIAL_LOBBY, JOIN, LEAVE, START} from "../actions/lobbyActions";

export const lobbyReducer = (state, action) => {
  let payload = action.payload;

  switch (action.type) {
    case INITIAL_LOBBY:
      return payload;

    case JOIN:
      return {...state, players: [...state.players, payload.player_name]};

    case LEAVE:
      const players = [...state.players].filter((player_name) => player_name !== payload.player_name);
      return {...state, players};

    case START:
      return {...state, started: true};

    default:
      console.log("ULTIMO CASO:", action.type);
  }
};
