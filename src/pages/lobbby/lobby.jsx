import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useWebSocket from "@/hooks/useWebSocket";
import { leave, start } from "@/services";
import { useLobby } from "@/contexts/lobby/lobbyContext";
import useFetch from "@/hooks/useFetch";

const Lobby = () => {
  const { lobby, lobbyDispatch, matchDispatch, player, playerDispatch } = useLobby();
  const { onMessageHandler } = useWebSocket(`${import.meta.env.VITE_WS_KEY}${lobby.match_id}?player_id=${player.player_id}`);
  const navigate = useNavigate();

  const { data, loading, error, fetchData } = useFetch();

  console.log("LOBBY:", lobby);
  console.log("PLAYER:", player);

  const handleLeave = async () => {
    await fetchData(() => leave(lobby.match_id, player.player_id));
  };

  const handleStart = async () => {
    const { error: errorResponse } = await fetchData(() => start(lobby.match_id, player.player_id));
    console.log("ERROR RESPONSE:", errorResponse);
  };

  useEffect(() => {
    onMessageHandler((message) => {
      const { action, ...rest } = message;

      if (action === "LOBBY_DESTROY") {
        navigate(-1);
        return;
      }

      if (action === "START") {
        const { hand, ...match } = rest.data;
        matchDispatch({ type: "INITIAL_MATCH", payload: match });
        playerDispatch({ type: "HAND", payload: hand });
        navigate(`/match/${lobby.code}`);
      }

      if (action === "LEAVE" && rest.player_name === player.player_name) {
        navigate(-1);
      }

      console.log("ACTION:", action);

      lobbyDispatch({ type: action, payload: rest });
    });
  }, [onMessageHandler, lobbyDispatch, lobby]);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-gray-800 text-white">
      <h1 className="mt-10 text-4xl font-bold">{lobby.name}</h1>
      <p className="mt-2 text-lg text-center">Code: {lobby.code}</p>

      <div className="mt-5">
        <h2 className="text-2xl font-semibold">Players:</h2>
        <ul className="mt-2">
          {lobby.players.map((player, playerIndex) => (
            <li key={playerIndex} className="text-lg">{player}</li>
          ))}
        </ul>
      </div>

      <div className="flex gap-10 mt-10">
        <button
          className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleLeave}
        >
          Leave
        </button>
        <button
          className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleStart}
          disabled={lobby.creator !== player.player_name}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Lobby;
