import { Database } from "../types/supabase";

export type GalleryType = Database["public"]["Tables"]["games"]["Row"] & {
  signatures: Database["public"]["Tables"]["signatures"]["Row"][];
};

export const GalleryItem = ({ game }: { game: GalleryType }) => {
  const { id, image, subject, signatures } = game;

  return (
    <div key={id} className="flex flex-col items-center space-y-3">
      <div className="image-frame relative">
        <img src={image} alt={subject} className="border border-black" />

        {signatures?.length > 0 ? (
          <div className="w-fit p-[15px] absolute right-0 bottom-0 flex justify-end">
            <img src={signatures[0].image} className="w-1/3" />
          </div>
        ) : null}
      </div>
      <div className="z-10 rounded-lg bg-white px-3 py-1 border border-gray-600 border-opacity-10 shadow-sm relative -top-9">
        {subject}
      </div>
    </div>
  );
};
