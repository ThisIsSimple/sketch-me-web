import { observer } from "mobx-react-lite";
import { appStore } from "../stores/app-store";

export const Loading = observer(() => {
  if (appStore.loading)
    return (
      <div className="z-[1000] w-screen h-screen fixed left-0 top-0 bg-black bg-opacity-75 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-white"></div>
        <p className="text-white mt-4">
          AI가 그림을 유심히 살펴보는 중입니다...
        </p>
      </div>
    );
  else return null;
});
