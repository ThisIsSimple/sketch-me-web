import { makeAutoObservable } from "mobx";
import supabase from "../utils/supabase";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

class SignatureStore {
  constructor() {
    makeAutoObservable(this);
  }

  async uplaodSignature(gameId: number, image: File | Blob) {
    const path = uuidv4() + ".webp";
    const result = await supabase.storage
      .from("signatures")
      .upload(path, image);
    const imagePath = result.data?.path;

    if (!imagePath) {
      toast.error("이미지 업로드에 실패했습니다.");
      return;
    }

    // get public url from path
    const { data } = supabase.storage
      .from("signatures")
      .getPublicUrl(imagePath);
    const publicUrl = data.publicUrl;

    if (!publicUrl) {
      toast.error("이미지 업로드에 실패했습니다.");
      return;
    }

    // add signature
    await supabase
      .from("signatures")
      .insert({ game_id: gameId, image: publicUrl })
      .select()
      .single();

    toast.success("서명이 완료되었습니다.");
  }
}

export const signatureStore = new SignatureStore();
