import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GamePage } from "../pages/game-page";
import { Layout } from "../components/layout";
import { TitlePage } from "../pages/title-page";
import { LobbyPage } from "../pages/lobby-page";
import { ResultPage } from "../pages/result-page";
import { GalleryPage } from "../pages/gallery-page";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TitlePage />} />
          <Route path="/game" element={<LobbyPage />} />
          <Route path="/game/:gameId" element={<GamePage />} />
          <Route path="/result/:gameId" element={<ResultPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
