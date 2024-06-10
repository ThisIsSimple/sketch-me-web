import CanvasDraw from "react-canvas-draw";
import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { gameStore } from "../stores/game-store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { runInAction } from "mobx";
import { appStore } from "../stores/app-store";
import { dataURLtoBlob } from "../utils/image";
import { signatureStore } from "../stores/signature-store";

export const SignatureModal = observer(
  ({
    onClose,
    onSignComplete,
  }: {
    onClose: () => void;
    onSignComplete: () => void;
  }) => {
    const navigate = useNavigate();
    const canvasRef = useRef(null);

    useEffect(() => {
      if (!gameStore.game) {
        toast.error("게임이 종료된 후에는 서명할 수 없습니다.");
        navigate("/");
      }
    }, [gameStore.game]);

    const handleSubmit = async () => {
      try {
        if (!gameStore.game) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        runInAction(() => (appStore.loading = true));

        const webpDataUrl = canvas.getDataURL("webp");
        const blob = dataURLtoBlob(webpDataUrl);

        // upload signature
        await signatureStore.uplaodSignature(gameStore.game.id, blob);
        onSignComplete();
        onClose();
      } catch (e) {
        console.error(e);
        toast.error("제출 중 오류가 발생했습니다.");
      } finally {
        runInAction(() => (appStore.loading = false));
      }
    };

    return (
      <div className="fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-75 flex flex-col justify-center items-center overflow-y-scroll">
        <div className="max-w-[500px] w-full rounded-xl bg-white shadow-lg">
          <div className="p-3 space-y-3">
            <header className="py-3">
              <h3 className="text-3xl font-bold text-center">서명하기</h3>
            </header>

            <div className="w-fit h-fit border">
              <CanvasDraw
                ref={canvasRef}
                hideGrid
                canvasWidth={500 - 24}
                canvasHeight={(500 - 24) / 2}
                brushRadius={2}
                brushColor="#000"
                lazyRadius={0}
              />
            </div>

            <button
              className="bg-gradient-to-r from-red-500 to-orange-500 w-full py-3 rounded-xl border-2 border-orange-500 shadow-sm hover:shadow-xl transition-shadow"
              onClick={handleSubmit}
            >
              <span className="text-white text-lg font-bold">완료</span>
            </button>

            <button className="w-full text-center" onClick={() => onClose()}>
              닫기
            </button>
          </div>
        </div>
      </div>
    );
  },
);
