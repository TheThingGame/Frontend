import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lobbyInfo: {
    match_id: "",
    name: "",
    creator: "",
    code: "",
    min_players: 2,
    max_players: 4,
    started: false,
    players: []
  },
  player: {
    player_id: "",
    player_name: "",
    hand: []
  }
};

const lobbySlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {
    INITIAL_LOBBY: (state, action) => {
        return action.payload

    },
    JOIN: (state, action) => {
        const { player_name } = action.payload;
        state.lobbyInfo.players.push(player_name);
      }
      ,
    LEAVE: (state, action) => {
      state.lobbyInfo.players = state.lobbyInfo.players.filter(
        (player) => player !== action.payload.player_name
      );
    },
    START: (state) => {
      state.lobbyInfo.started = true;
    },
  },
});

export const { INITIAL_LOBBY, JOIN, LEAVE, START } = lobbySlice.actions;
export default lobbySlice.reducer;
