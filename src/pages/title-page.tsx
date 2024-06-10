import { useNavigate } from "react-router-dom";
import { gameStore } from "../stores/game-store";

export const TitlePage = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    gameStore.reset();
    navigate("/game");
  };

  return (
    <div className="space-y-4">
      <img src="/title.webp" className="rounded-xl overflow-hidden shadow-sm" />

      <button
        className="bg-gradient-to-r from-red-500 to-orange-500 w-full py-4 rounded-xl border-2 border-orange-500 shadow-sm hover:shadow-xl transition-shadow"
        onClick={handleStartGame}
      >
        <span className="text-white text-xl font-bold">게임 시작하기</span>
      </button>
    </div>
  );
};
