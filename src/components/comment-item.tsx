import { Database } from "../types/supabase";
import supabase from "../utils/supabase";

export const CommentItem = ({
  comment,
  isAI,
  onDelete,
}: {
  comment: Database["public"]["Tables"]["comments"]["Row"];
  isAI: boolean;
  onDelete?: () => void;
}) => {
  const handleDelete = async () => {
    const password = prompt("비밀번호를 입력해주세요.");
    if (password) {
      const response = await supabase
        .from("comments")
        .delete()
        .eq("id", comment.id)
        .eq("password", password);
      console.log(response);
      onDelete?.();
    }
  };

  return (
    <div className="w-full flex justify-between items-center">
      <div className="w-full flex items-center gap-3">
        {isAI ? (
          <img
            src="/ai_profile.webp"
            className="flex-none w-12 h-12 rounded-full border"
          />
        ) : (
          <img
            src="https://tse1.mm.bing.net/th?q=blank%20profile%20picture&w=250&h=250&c=7"
            className="flex-none w-12 h-12 rounded-full border"
          />
        )}
        <div>
          <p className="font-bold text-sm">{comment.name}</p>
          <p className="">{comment.comment}</p>
        </div>
      </div>
      {!isAI ? (
        <button className="flex-none text-sm" onClick={handleDelete}>
          삭제
        </button>
      ) : null}
    </div>
  );
};
