import { makeAutoObservable } from "mobx";
import toast from "react-hot-toast";
import supabase from "../utils/supabase";
import { v4 as uuidv4 } from "uuid";
import { Database } from "../types/supabase";
import { API } from "../api/instance";

type PredictionResponse = {
  url: string;
  label: string;
  percentage: number;
  predictions: {
    [label: string]: number;
  };
};

export const SUBJECT_LIST = [
  "사과",
  "자전거",
  "뇌",
  "모니터",
  "라이플",
  "가위",
  "뱀",
  "나무",
];

class GameStore {
  loading: boolean = true;

  game: Database["public"]["Tables"]["games"]["Row"] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async createNewGame() {
    // create new game
    const { data } = await supabase
      .from("games")
      .insert({
        status: "PLAYING",
        subject: this.selectRandomSubject(),
      })
      .select()
      .single();
    this.game = data;
    return data?.id;
  }

  async init(gameId?: string | null) {
    try {
      this.loading = true;

      if (gameId) {
        // check game is ENDED
        const game = await supabase
          .from("games")
          .select("*")
          .eq("id", gameId)
          .single();
        if (!game.data) {
          const errorMessage = "존재하지 않는 게임입니다.";
          location.href = "/?error=" + encodeURI(errorMessage);
          return;
        }
        if (game.data?.status === "ENDED") {
          const errorMessage = "이미 종료된 게임입니다.";
          location.href =
            "/result/" + gameId + "?error=" + encodeURI(errorMessage);
          return;
        }
        this.game = game.data;
      }

      this.loading = false;
    } catch (e) {
      console.error(e);
      const errorMessage = "게임 초기화에 실패했습니다.";
      location.href = "/?error=" + encodeURI(errorMessage);
      this.loading = true;
    }
  }

  selectRandomSubject() {
    const randomIndex = Math.floor(Math.random() * SUBJECT_LIST.length);
    return SUBJECT_LIST[randomIndex];
  }

  async submitImage(image: File | Blob) {
    if (!this.game) return;

    const path = uuidv4() + ".webp";
    const result = await supabase.storage.from("images").upload(path, image);
    const imagePath = result.data?.path;

    if (!imagePath) {
      toast.error("이미지 업로드에 실패했습니다.");
      return;
    }

    // get public url from path
    const { data } = supabase.storage.from("images").getPublicUrl(imagePath);
    const publicUrl = data.publicUrl;

    if (!publicUrl) {
      toast.error("이미지 업로드에 실패했습니다.");
      return;
    }

    // TODO. add check to image model
    const prediction = await API.post<PredictionResponse>("/prediction", {
      url: publicUrl,
    });

    let is_correct = false;

    // Check Result
    if (prediction.data.label === this.game.subject) {
      // if correct
      is_correct = true;
    }

    // update game status
    await supabase
      .from("games")
      .update({
        image: publicUrl,
        status: "ENDED",
        is_correct,
        predicted_label: prediction.data.label,
        prediction: prediction.data.predictions,
        percentage: prediction.data.percentage * 100,
      })
      .eq("id", this.game.id);
  }

  reset() {
    this.loading = true;
    this.game = null;
  }
}

export const gameStore = new GameStore();
