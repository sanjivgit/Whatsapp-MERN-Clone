import axios from "./axios";

export const addUser = async (data) => {
  try {
    return await axios.post("/users/new", {
      localId: data.localId,
      fullName: data.fullName,
      email: data.email,
      photoUrl: data.photoUrl,
    });
  } catch (err) {
    console.log(err);
  }
};
