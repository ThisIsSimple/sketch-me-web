import { ClimbingBoxLoader } from "react-spinners";
import { gameStore } from "../stores/game-store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const LobbyPage = observer(() => {
  const navigate = useNavigate();

  const createNewGameAndNavigate = async () => {
    const gameId = await gameStore.createNewGame();
    toast("게임을 시작합니다!");
    navigate("/game/" + gameId, { replace: true });
  };

  useEffect(() => {
    if (gameStore.game) {
      navigate("/game/" + gameStore.game.id, { replace: true });
    } else createNewGameAndNavigate();
  }, [gameStore.game]);

  if (gameStore.loading)
    return (
      <div className="flex flex-col items-center">
        <ClimbingBoxLoader />
        <p className="text-lg">로딩중...</p>
      </div>
    );
});
