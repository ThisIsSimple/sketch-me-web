import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Database } from "../types/supabase";
import supabase from "../utils/supabase";
import { GameLoading } from "../components/game-loading";
import { ResultModal } from "../components/result-modal";

export const ResultPage = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();

  const [game, setGame] = useState<
    Database["public"]["Tables"]["games"]["Row"] | null
  >(null);

  useEffect(() => {
    if (gameId) {
      supabase
        .from("games")
        .select("*")
        .eq("id", gameId)
        .then(({ data, error }) => {
          if (data) {
            setGame(data[0]);
          }
        });
    }
  }, [gameId]);

  const [showResultModal, setShowResultModal] = useState(false);
  const showResult = () => {
    setShowResultModal(true);
  };

  if (!game) return <GameLoading />;

  return (
    <div className="w-full space-y-3">
      <header className="mb-4">
        <h1 className="text-4xl font-bold text-center">
          내가 그린 '{game.subject}'
        </h1>
      </header>
      <img src={game.image} className="w-full border" />

      <div className="space-y-4">
        <button
          className="bg-gradient-to-r from-red-500 to-orange-500 w-full py-4 rounded-xl border-2 border-orange-500 shadow-sm hover:shadow-xl transition-shadow"
          onClick={showResult}
        >
          <span className="text-white text-xl font-bold">AI의 예측은?</span>
        </button>
        <button
          className="w-full text-center text-lg font-bold"
          onClick={() => navigate("/")}
        >
          다시하기
        </button>
      </div>

      {showResultModal ? (
        <ResultModal onClose={() => setShowResultModal(false)} game={game} />
      ) : null}
    </div>
  );
};
