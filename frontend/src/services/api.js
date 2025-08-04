const API_KEY = "78a37d82";
const BASE_URL = "https://www.omdbapi.com/";

export const getMovies = async (searchTerm = "action") => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`);
    const data = await response.json();

    if (data.Response === "False") {
      console.error("getMovies error:", data.Error);
      return [];
    }

    return data.Search || [];
  } catch (error) {
    console.error("Network error in getMovies:", error);
    return [];
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (data.Response === "False") {
      throw new Error(data.Error);
    }

    console.log("Search results:", data.Search);
    return data.Search;
  } catch (error) {
    console.error("Error in searchMovies:", error);
    throw error;
  }
};
