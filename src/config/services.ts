const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost";

export const services = {
  gallery: `${BASE_URL}:6071`,
  prices: `${BASE_URL}:6072`,
  comments: `${BASE_URL}:6073`,
  utility: `${BASE_URL}:6074`,
  filter: `${BASE_URL}:6075`,
  profile: `${BASE_URL}:6076`,
  favorites: `${BASE_URL}:6077`,
  users: `${BASE_URL}:6078`,
  access: `${BASE_URL}:6079`,
  homeNav: `${BASE_URL}:6080`,
  offers: `${BASE_URL}:6081`,
  penalty: `${BASE_URL}:6082`,
};
