import { useParams } from "react-router-dom";
import { GalleryItem, GalleryType } from "../components/gallery-item";
import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { GameLoading } from "../components/game-loading";
import { FloatingBack } from "../components/floating-back";
import { Database } from "../types/supabase";
import { CommentItem } from "../components/comment-item";
import toast from "react-hot-toast";
import { IoLink } from "react-icons/io5";

export const GalleryDetailPage = () => {
  const { galleryId } = useParams();

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const [gallery, setGallery] = useState<GalleryType | null>(null);
  const [comments, setComments] = useState<
    Database["public"]["Tables"]["comments"]["Row"][]
  >([]);

  const getComments = () => {
    if (!galleryId) return;
    supabase
      .from("comments")
      .select("id, name, comment, created_at")
      .eq("game_id", galleryId)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
        } else {
          setComments(data);
        }
      });
  };

  useEffect(() => {
    if (galleryId) {
      supabase
        .from("games")
        .select("*, signatures(*)")
        .eq("id", galleryId)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error(error);
          } else {
            setGallery(data);
          }
        });
      getComments();
    }
  }, []);

  const copyToClipboard = async () => {
    const currentLink = window.location.href;
    try {
      await navigator.clipboard.writeText(currentLink);
      toast.success("링크가 복사되었어요!");
    } catch (err) {
      toast.error("Failed to copy: ", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!gallery) return;
    if (!name || !password || !comment) return;

    await supabase.from("comments").insert({
      game_id: gallery.id,
      name,
      comment,
      password,
    });
    // reset
    setName("");
    setPassword("");
    setComment("");
    // get comments
    getComments();
  };

  if (!gallery) return <GameLoading />;

  return (
    <div className="min-h-screen pt-10">
      <GalleryItem game={gallery} />

      <div className="flex justify-end py-5">
        <button
          onClick={copyToClipboard}
          className="px-3 py-2 rounded-lg bg-white flex items-center gap-2 font-bold shadow-md"
        >
          <IoLink />
          링크복사
        </button>
      </div>

      <div className="mb-10 space-y-5">
        <CommentItem
          comment={{
            id: 0,
            name: "AI 비평가",
            comment: `이 그림은 ${gallery.percentage}% 확률로 '${gallery.predicted_label}'이군요!`,
            game_id: gallery.id,
            password: "",
            created_at: gallery.created_at,
          }}
          isAI
        />
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            isAI={false}
            onDelete={() => getComments()}
          />
        ))}
      </div>

      <form
        className="p-5 rounded-t-xl border bg-white shadow-lg space-y-2"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label className="text-sm" htmlFor="name">
              이름
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm" htmlFor="password">
              비밀번호
            </label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-sm" htmlFor="comment">
            댓글
          </label>
          <textarea
            required
            value={comment}
            onChange={(e) => setComment(e.currentTarget.value)}
            rows={3}
            id="comment"
            name="comment"
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-red-500 to-orange-500 w-full py-2 rounded-lg border-2 border-orange-500 shadow-sm hover:shadow-xl transition-shadow"
        >
          <span className="text-white  font-bold">댓글 남기기</span>
        </button>
      </form>

      <FloatingBack />
    </div>
  );
};
