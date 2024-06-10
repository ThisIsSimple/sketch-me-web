import { useNavigate } from "react-router-dom";
import { gameStore } from "../stores/game-store";
import { GrGallery } from "react-icons/gr";

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

      <button
        onClick={() => navigate("/gallery")}
        className="w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-shadow fixed bottom-4 right-4 bg-orange-500 text-white flex flex-col justify-center items-center gap-0.5"
      >
        <GrGallery size={20} />
        <p className="font-bold text-xs">갤러리</p>
      </button>
    </div>
  );
};
