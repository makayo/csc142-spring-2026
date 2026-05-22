import axios from "axios";

const BASE_URL = "http://localhost:3001/profile";

export const fetchProfile = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const updateProfile = async (data: any) => {
  // REQUIRED SIMULATION
  if (data.email === "conflict@example.com") {
    return Promise.reject({
      response: {
        status: 409,
        data: { message: "Email already exists" },
      },
    });
  }

  const res = await axios.put(BASE_URL, data);
  return res.data;
};
