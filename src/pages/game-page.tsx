import CanvasDraw from "react-canvas-draw";
import { SubjectDisplay } from "../components/subject-display";
import { useEffect, useRef } from "react";
import { gameStore } from "../stores/game-store";
import { observer } from "mobx-react-lite";
import { dataURLtoBlob } from "../utils/image";
import { useNavigate, useParams } from "react-router-dom";
import { GameLoading } from "../components/game-loading";
import { appStore } from "../stores/app-store";
import { runInAction } from "mobx";
import { FaRedo } from "react-icons/fa";
import toast from "react-hot-toast";

export const GamePage = observer(() => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const { gameId } = useParams();

  useEffect(() => {
    gameStore.init(gameId);
  }, [gameId]);

  const handleSubmit = async () => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      runInAction(() => (appStore.loading = true));

      const webpDataUrl = canvas.getDataURL("webp", false, "white");
      const blob = dataURLtoBlob(webpDataUrl);

      await gameStore.submitImage(blob); // submit image and test
      navigate("/result/" + gameId);
    } catch (e) {
      console.error(e);
      toast.error("제출 중 오류가 발생했습니다.");
    } finally {
      runInAction(() => (appStore.loading = false));
    }
  };

  const handleReset = () => {
    if (!canvasRef.current) return;
    canvasRef.current.clear();
  };

  if (gameStore.loading) return <GameLoading />;

  return (
    <div className="flex flex-col items-center px-5 py-10 space-y-8">
      <header>
        <SubjectDisplay />
      </header>

      <div className="w-fit h-fit border relative">
        <CanvasDraw
          ref={canvasRef}
          hideGrid
          canvasWidth={512}
          canvasHeight={512}
          brushRadius={2}
          brushColor="#000"
          lazyRadius={0}
        />
        <button
          onClick={handleReset}
          className="w-12 h-12 rounded-full flex justify-center items-center bg-white shadow-lg hover:shadow-xl transition-shadow absolute left-4 bottom-4"
        >
          <FaRedo />
        </button>
      </div>

      <button
        className="bg-gradient-to-r from-red-500 to-orange-500 w-full py-4 rounded-xl border-2 border-orange-500 shadow-sm hover:shadow-xl transition-shadow"
        onClick={handleSubmit}
      >
        <span className="text-white text-xl font-bold">제출하기</span>
      </button>
    </div>
  );
});
