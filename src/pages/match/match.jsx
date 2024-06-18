import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { playCard, stealCard, nextTurn, uno } from "@/services";
import useFetch from "@/hooks/useFetch";
import useWebSocket from "@/hooks/useWebSocket";
import { useLobby } from "@/contexts/lobby/lobbyContext";
import useModal from "@/hooks/useModal"
import Modal from "@/ui/modal"

const Match = () => {
  const { lobby, match, matchDispatch, player, playerDispatch } = useLobby();
  const { onMessageHandler } = useWebSocket(`${import.meta.env.VITE_WS_KEY}${lobby.match_id}?player_id=${player.player_id}`);
  const { data, loading, error, fetchData } = useFetch();
  const changeColor = useModal();
  const [wildcard, setWildcard] = useState(false)
  const navigate = useNavigate();

  const positions = {
    0: "bottom-0 left-1/2 -translate-x-1/2",
    1: "top-1/2 left-0 -translate-y-1/2",
    2: "top-0 left-1/2 -translate-x-1/2",
    3: "top-1/2 right-0 -translate-y-1/2",
  };

  console.log("MATCH STATE:", match);

  useEffect(() => {
    onMessageHandler((message) => {
      const { action, ...rest } = message;
      console.log("REST:", rest)

      if (action === "STEAL" && player.player_name === match.curr_turn) {
        console.log("REST:", rest);
        playerDispatch({ type: "ADD_CARDS", payload: rest });
      }

      if (action === "TAKE" && rest.cards) {
        console.log("REST:", rest);
        playerDispatch({ type: "ADD_CARDS", payload: rest.cards });
      }

      if (action === "WILDCARD" && rest.player_name === player.player_name) {
        setWildcard(true)
      }

      matchDispatch({ type: action, payload: rest });
    });
  }, [onMessageHandler, matchDispatch, match]);

  const handlePlayCard = async (id, type) => {
    const { error: errorResponse } = await fetchData(() => playCard(lobby.match_id, player.player_id, id));
    console.log("ERROR RESPONSE:", errorResponse);
    if (errorResponse) return
    playerDispatch({ type: "REMOVE_CARD", payload: id });
    if (type === "TAKE_FOUR_WILDCARD" || type === "WILDCARD") {
      changeColor.toggleModal()
    }

  };

  const handleSteal = async () => {
    const { error: errorResponse } = await fetchData(() => stealCard(lobby.match_id, player.player_id));
    console.log("ERROR RESPONSE:", errorResponse);
  };

  const handleNextTurn = async () => {
    const { error: errorResponse } = await fetchData(() => nextTurn(lobby.match_id, player.player_id));
    console.log("ERROR RESPONSE:", errorResponse);
  };

  const handleUno = async () => {
    const { error: errorResponse } = await fetchData(() => uno(lobby.match_id, player.player_id));
    console.log("ERROR RESPONSE:", errorResponse);
  }

  const handleChageColor = async (color) => {
    const { error: errorResponse } = await fetchData(() => changeColor(lobby.match_id, player.player_id, color));

    if (!errorResponse) return
    changeColor.toggleModal()
    console.log("ERROR RESPONSE:", errorResponse);
  }

  if (!match || !match.ordered_players) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-screen min-h-screen flex justify-center items-center relative bg-gray-800 text-white">

      <Modal
        showModal={changeColor.showModal}
        isBlocked={true}
        toggleModal={changeColor.toggleModal}
        ref={changeColor.ref}
      >
        <div className="flex flex-col gap-10">
          <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">Please select a color</h2>
          <div className="flex gap-5 justify-center">
            <button className="w-10 h-10 rounded-full bg-blue-500" onClick={() => handleChageColor("BLUE")}></button>
            <button className="w-10 h-10 rounded-full bg-green-500" onClick={() => handleChageColor("GREEN")}></button>
            <button className="w-10 h-10 rounded-full bg-red-500" onClick={() => handleChageColor("RED")}></button>
            <button className="w-10 h-10 rounded-full bg-yellow-500" onClick={() => handleChageColor("YELLOW")}></button>
          </div>
        </div>
      </Modal>

      <div className="flex items-center justify-normal gap-10 absolute z-10">
        <div className="flex flex-col items-center gap-10">
          <div className="flex items-center gap-10">
            <img className="border-2 rounded-sm border-white" src={`/cards/${match.pot.id}.png`} width={60} />
            <img src={`/cards/back.png`} width={60} onClick={handleSteal} />
            <div className={`w-20 h-20 z-40 flex justify-center items-center border border-red-50  rounded-full bg-${match.color ? match.color : "slate"}-500`}>{!match.color && "No color"}</div>
          </div>

          <div className="flex gap-10">
            <button className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleUno}>Uno</button>
            <button className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleNextTurn}>Next</button>
          </div>
        </div>
      </div>

      <div className="relative w-full min-h-[800px]">
        {match.ordered_players.map(({ player_name, cards }, playerIndex) => {
          let position;
          let direction;
          let playersLength = match.ordered_players.length;

          if (playersLength === 2) {
            position = playerIndex === 0 ? positions[0] : positions[2];
            direction = "flex-row";
          } else {
            position = positions[playerIndex];
            direction = playerIndex % 2 === 0 ? 'flex-row' : 'flex-col';
          }

          return (
            <div key={playerIndex} className={`absolute ${position} flex flex-col justify-normal items-center`}>
              <p className={`mb-2 ${match.curr_turn === player_name && `font-extrabold`}`}>{player_name}</p>
              <div className={`flex justify-start items-center w-full ${direction} space-x-2 space-y-2`}>
                {player_name === player.player_name
                  ? player?.hand.map((card, cardIndex) => (
                    <img className="border-2 rounded-sm border-white" key={cardIndex} src={`/cards/${card.id}.png`} alt={card.type} width={60} onClick={() => handlePlayCard(card.id, card.type)} />
                  ))
                  : Array.from({ length: cards }, (_, cardIndex) => (
                    <img key={cardIndex} src={`/cards/back.png`} alt="back" width={60} />
                  ))}
              </div>
            </div>

          );
        })}
      </div>
    </div>
  );
};

export default Match;
