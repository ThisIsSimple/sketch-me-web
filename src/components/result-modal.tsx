import { Database } from "../types/supabase";
import { getRandomCorrectImage } from "../utils/correct-image";
import { getRandomErrorImage } from "../utils/error-image";

export const ResultModal = ({
  onClose,
  game,
}: {
  onClose: () => void;
  game: Database["public"]["Tables"]["games"]["Row"];
}) => {
  const is_correct = game.is_correct;

  const image = is_correct ? getRandomCorrectImage() : getRandomErrorImage();
  const percentage = game.prediction?.[game.predicted_label] * 100;

  return (
    <div className="fixed left-0 top-0 w-screen h-screen bg-black bg-opacity-75 flex flex-col justify-center items-center overflow-y-scroll">
      <div className="max-w-[500px] w-full rounded-xl bg-white shadow-lg">
        <div className="p-3 space-y-3">
          <header className="py-3">
            <h3 className="text-3xl font-bold text-center">
              AI의 예측 : {game.predicted_label} ({percentage}%)
            </h3>
          </header>

          <img src={image} className="w-full h-full rounded-xl" />

          <div className="grid grid-cols-4">
            {Object.keys(game.prediction).map((key) => (
              <p className="text-sm">
                {key}: {game.prediction[key] * 100}%
              </p>
            ))}
          </div>

          <button
            className="bg-gradient-to-r from-red-500 to-orange-500 w-full py-3 rounded-xl border-2 border-orange-500 shadow-sm hover:shadow-xl transition-shadow"
            onClick={onClose}
          >
            <span className="text-white text-lg font-bold">결과 닫기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
