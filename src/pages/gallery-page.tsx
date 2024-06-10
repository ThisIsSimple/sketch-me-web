import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GalleryItem, GalleryType } from "../components/gallery-item";

export const GalleryPage = () => {
  const navigate = useNavigate();

  const [games, setGames] = useState<GalleryType[]>([]);

  useEffect(() => {
    supabase
      .from("games")
      .select("*, signatures(*)")
      .eq("status", "ENDED")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          return;
        }
        setGames(data);
      });
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 p-5">
        {games.map((game) => (
          <GalleryItem key={game.id} game={game} />
        ))}
      </div>
      <button
        onClick={() => navigate("/")}
        className="w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-shadow fixed bottom-4 left-4 bg-orange-500 text-white flex flex-col justify-center items-center gap-0.5"
      >
        <IoMdArrowRoundBack size={32} />
      </button>
    </>
  );
};
