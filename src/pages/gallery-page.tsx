import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GalleryItem, GalleryType } from "../components/gallery-item";
import { FloatingBack } from "../components/floating-back";

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
      <div className="grid grid-cols-2 gap-x-5 gap-y-1 p-5">
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => navigate(`/gallery/${game.id}`)}
            className="cursor-pointer"
          >
            <GalleryItem game={game} />
          </div>
        ))}
      </div>
      <FloatingBack />
    </>
  );
};
