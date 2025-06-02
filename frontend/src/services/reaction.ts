"use server";

import api from "@/lib/fetch";

interface ReactionPayload {
  type: "like" | "dislike" | "favorite";
  //   user?: SessionUser;
  //   movie?: Movie;
}

export const reaction = async (formData: ReactionPayload) => {
  // const response = await api({
  //   method: "POST",
  //   endpoint: "/reactions/",
  //   body: formData,
  // });

  // console.log(response);

  return await api({
    method: "POST",
    endpoint: "/reactions/",
    body: formData,
  });
};
