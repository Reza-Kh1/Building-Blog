"use server";
import { fetchApi } from "./fetchApi";
const actionComments = async (prevState: any, formData: FormData) => {
  const getPostId = formData.get("postId") as string;
  const getRepliesId = formData.get("replies") as string;
  const body = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    text: formData.get("text"),
    postId: JSON.parse(getPostId),
  } as any;
  if (getRepliesId) {
    body.replies = JSON.parse(getRepliesId);
  }  
  const data = await fetchApi({ url: "comment", method: "POST", body });
  if (data.success) {
    return {
      msg: "ok",
      err: "",
    };
  }
  return {
    msg: "",
    err: "ok",
  };
};
export default actionComments;
