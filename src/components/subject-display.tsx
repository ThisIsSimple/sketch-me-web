import { observer } from "mobx-react-lite";
import { gameStore } from "../stores/game-store";

export const SubjectDisplay = observer(() => {
  return (
    <div>
      <h1 className="font-extrabold text-4xl tracking-[0.5rem]">
        {gameStore.game?.subject}
      </h1>
    </div>
  );
});
