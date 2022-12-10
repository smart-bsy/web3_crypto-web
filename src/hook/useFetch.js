import { useEffect, useState } from "react";

const VITE_GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

console.log(VITE_GIPHY_API_KEY);

export function useFetch({ keyword }) {
  const [gifUrl, setGifUrl] = useState();

  async function fetchGifUrl() {
    try {
      const resp = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${VITE_GIPHY_API_KEY}&q=${keyword
          .split(" ")
          .join("")}&limit=1`
      );
      const { data } = resp.json();
      setGifUrl(data[0]?.images?.downsized_medium?.url);
    } catch (error) {
      setGifUrl(
        "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284"
      );
    }
  }

  useEffect(() => {
    if (keyword) {
      fetchGifUrl();
    }
  }, [keyword]);

  return gifUrl;
}
