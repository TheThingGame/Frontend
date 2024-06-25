import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useState,
} from "react";
import { lobbyReducer } from "./reducers/lobbyReducer";
import { matchReducer } from "./reducers/matchReducer";
import { playerReducer } from "./reducers/playerReducer";
import { initialLobbyState } from "./states/initialLobbyState";
import { initialPlayerState } from "./states/initialPlayerState";
import { initialMatchState } from "./states/initialMatchState";

const LobbyContext = createContext();

export const useLobby = () => useContext(LobbyContext);

export const LobbyProvider = ({ children }) => {
  const [lobby, lobbyDispatch] = useReducer(lobbyReducer, initialLobbyState);
  const [match, matchDispatch] = useReducer(matchReducer, initialMatchState);
  const [player, playerDispatch] = useReducer(
    playerReducer,
    initialPlayerState
  );

  const memoizedValue = useMemo(() => {
    return {
      lobby,
      lobbyDispatch,
      match,
      matchDispatch,
      player,
      playerDispatch,
    };
  }, [lobby, lobbyDispatch, match, matchDispatch, player, playerDispatch]);

  return (
    <LobbyContext.Provider value={memoizedValue}>
      {children}
    </LobbyContext.Provider>
  );
};

export default LobbyProvider;
