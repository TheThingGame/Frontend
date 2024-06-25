import {
  INITIAL_MATCH,
  TAKE,
  PLAY_CARD,
  STEAL,
  NEXT_TURN,
  CHANGE_COLOR,
  JUMP,
  WINNER,
  NOT_UNO,
  UNO,
  PLAY_AGAIN,
} from "../actions/matchActions";

export const matchReducer = (state, action) => {
  let payload = action.payload;

  const updatePlayerCards = (player_name, quantity) => {
    return [...state.ordered_players].map((player) =>
      player.player_name === player_name ? {...player, cards: player.cards + quantity} : player
    );
  };

  switch (action.type) {
    case INITIAL_MATCH: {
      const {ordered_players, pot, turn: curr_turn} = action.payload;

      const playersWithCards = ordered_players.map((player_name) => ({
        player_name,
        cards: 7,
      }));
      return {
        ...state,
        ordered_players: playersWithCards,
        pot,
        curr_turn,
        prev_turn: curr_turn,
        color: pot.color,
      };
    }

    case PLAY_CARD: {
      const {player_name, pot, turn: curr_turn} = payload;
      const prev_turn = state.curr_turn;
      let ordered_players = updatePlayerCards(player_name, -1);

      return {
        ...state,
        ordered_players,
        curr_turn,
        prev_turn,
        pot,
        color: pot.color,
      };
    }

    case STEAL: {
      let ordered_players = updatePlayerCards(state.curr_turn, 1);
      return {...state, ordered_players, uno: false};
    }

    case TAKE: {
      const {cards, player_name, length, turn: curr_turn} = payload;
      let ordered_players = updatePlayerCards(player_name, cards ? cards.length : length);
      const prev_turn = state.curr_turn;

      return {
        ...state,
        prev_turn,
        curr_turn,
        ordered_players,
        uno: false,
      };
    }

    case NEXT_TURN: {
      const prev_turn = state.curr_turn;
      return {...state, prev_turn, curr_turn: payload.turn};
    }

    case JUMP: {
      const prev_turn = state.curr_turn;
      const {turn: curr_turn} = payload;
      return {...state, prev_turn, curr_turn};
    }

    case CHANGE_COLOR: {
      const prev_turn = state.curr_turn;
      const {turn: curr_turn, color} = payload;
      return {...state, color, prev_turn, curr_turn};
    }
    case WINNER: {
      return {...state, winner: payload.player_name};
    }

    case NOT_UNO: {
      const {cards, player_name, length, turn: curr_turn} = payload;
      let ordered_players = updatePlayerCards(player_name, cards ? cards.length : length);
      const prev_turn = state.curr_turn;

      return {
        ...state,
        prev_turn,
        curr_turn,
        ordered_players,
        uno: "",
      };
    }

    case UNO: {
      return {...state, uno: payload.player_name};
    }

    case PLAY_AGAIN: {
      return {};
    }

    default:
      console.log("ULTIMO CASO:", action.type);
  }
};
