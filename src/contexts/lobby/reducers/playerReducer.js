import {INITIAL_PLAYER, HAND, REMOVE_CARD, ADD_CARDS} from "../actions/playerActions";

export const playerReducer = (state, action) => {
  let payload = action.payload;

  switch (action.type) {
    case INITIAL_PLAYER:
      return {...state, ...payload};

    case HAND:
      return {...state, hand: payload};

    case REMOVE_CARD: {
      const hand = [...state.hand].filter(({id}) => id !== payload);
      return {...state, hand};
    }

    case ADD_CARDS: {
      const hand = [...state.hand, ...payload.cards];
      return {...state, hand};
    }

    default:
      console.log("ULTIMO CASO:", action.type);
  }
};
