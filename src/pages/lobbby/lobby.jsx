import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useWebSocket from "@/hooks/useWebSocket";
import {leave, start} from "@/services";
import {useLobby} from "@/contexts/lobby/lobbyContext";
import useFetch from "@/hooks/useFetch";

const Lobby = () => {
  const {lobby, lobbyDispatch, matchDispatch, player, playerDispatch} = useLobby();
  const {onMessageHandler} = useWebSocket(
    `${import.meta.env.VITE_WS_KEY}${lobby.match_id}?player_id=${player.player_id}`
  );
  const navigate = useNavigate();

  const {data, loading, error, fetchData} = useFetch();

  const handleLeave = async () => {
    await fetchData(() => leave(lobby.match_id, player.player_id));
  };

  const handleStart = async () => {
    const {error: errorResponse} = await fetchData(() => start(lobby.match_id, player.player_id));
  };

  useEffect(() => {
    onMessageHandler((message) => {
      const {action, ...rest} = message;

      if (action === "LOBBY_DESTROY") {
        navigate(-1);
        return;
      }

      if (action === "START") {
        const {hand, ...match} = rest.data;
        matchDispatch({type: "INITIAL_MATCH", payload: match});
        playerDispatch({type: "HAND", payload: hand});
        if (match.pot.type === "TAKE_TWO") return;
        navigate(`/match/${lobby.code}`);
      }

      if (action === "LEAVE" && rest.player_name === player.player_name) {
        navigate(-1);
      }

      if (action === "TAKE") {
        if (rest.cards) {
          playerDispatch({type: "ADD_CARDS", payload: {cards: rest.cards}});
        }

        matchDispatch({type: "TAKE", payload: rest});
        navigate(`/match/${lobby.code}`);
        return;
      }

      lobbyDispatch({type: action, payload: rest});
    });
  }, [onMessageHandler, lobbyDispatch, lobby, navigate, matchDispatch, player.player_name, playerDispatch]);

  return (
    <div className='w-screen min-h-screen flex flex-col p-10 bg-gray-700 text-white'>
      <div className='flex flex-col items-center'>
        <h1 className='flex  text-4xl font-bold'>{lobby.name}</h1>
        <p className='mt-2 text-lg'>Code: {lobby.code}</p>
      </div>

      <div className='flex flex-col items-center self-center m-auto'>
        <div className='mt-5'>
          <h2 className='text-2xl font-semibold'>Players:</h2>
          <ul className='mt-2'>
            {lobby.players.map((player, playerIndex) => (
              <li key={playerIndex} className='text-lg'>
                {player}
              </li>
            ))}
          </ul>
        </div>

        <div className='flex gap-10 mt-10'>
          <button
            className='flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            onClick={handleLeave}>
            Leave
          </button>
          <button
            className='flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={handleStart}
            disabled={lobby.creator !== player.player_name}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
