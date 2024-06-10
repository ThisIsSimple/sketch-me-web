import { ClimbingBoxLoader } from "react-spinners";

export const GameLoading = () => {
  return (
    <div className="flex flex-col items-center">
      <ClimbingBoxLoader />
      <p className="text-lg">로딩중...</p>
    </div>
  );
};
