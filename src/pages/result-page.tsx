import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Database } from "../types/supabase";
import supabase from "../utils/supabase";
import { GameLoading } from "../components/game-loading";
import { ResultModal } from "../components/result-modal";
import { observer } from "mobx-react-lite";
import { gameStore } from "../stores/game-store";
import { SignatureModal } from "../components/signature-modal";

export const ResultPage = observer(() => {
  const navigate = useNavigate();
  const { gameId } = useParams();

  const [game, setGame] = useState<
    Database["public"]["Tables"]["games"]["Row"] | null
  >(null);

  const isJustEnded = useMemo(
    () => (gameStore.game ? game?.signature?.length <= 0 : false),
    [gameStore.game, game],
  );

  const loadData = (gameId: string) => {
    supabase
      .from("games")
      .select("*, signature:signatures(*)")
      .eq("id", gameId)
      .single()
      .then(({ data }) => {
        console.log(data);
        if (data) {
          setGame(data);
        }
      });
  };

  const handleSignComplete = () => {
    if (!gameId) return;

    loadData(gameId);
  };

  useEffect(() => {
    if (gameId) loadData(gameId);
  }, [gameId]);

  const [showResultModal, setShowResultModal] = useState(false);
  const showResult = () => {
    setShowResultModal(true);
  };

  const [showSignatureModal, setShowSignatureModal] = useState(false);

  if (!game) return <GameLoading />;

  return (
    <div className="w-full space-y-3">
      <header className="mb-4">
        <h1 className="text-4xl font-bold text-center">
          내가 그린 '{game.subject}'
        </h1>
      </header>

      <div className="relative">
        <img src={game.image} className="w-full border" />

        {game.signature?.length > 0 ? (
          <img
            src={game.signature[0].image}
            className="w-1/3 absolute bottom-5 right-5"
          />
        ) : null}

        {isJustEnded ? (
          <button
            onClick={() => setShowSignatureModal(true)}
            className="absolute bottom-4 right-4 px-2 py-0.5 rounded-lg bg-white shadow-sm border text-sm font-bold"
          >
            서명하기
          </button>
        ) : null}
      </div>

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

      {showSignatureModal ? (
        <SignatureModal
          onClose={() => setShowSignatureModal(false)}
          onSignComplete={handleSignComplete}
        />
      ) : null}
    </div>
  );
});
