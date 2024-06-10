import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const FloatingBack = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-shadow fixed bottom-4 left-4 bg-orange-500 text-white flex flex-col justify-center items-center gap-0.5"
    >
      <IoMdArrowRoundBack size={32} />
    </button>
  );
};
