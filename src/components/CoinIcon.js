import { React, useState, useEffect } from "react";

const CoinIcon = ({ coinId }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
      .then((response) => response.json())
      .then((data) => setImageUrl(data.image.large))
      .catch((error) => console.error(error));
  }, [coinId]);

  return imageUrl ? <img className="coinIcon" src={imageUrl} alt={`${coinId} logo`} /> : null;
};

export default CoinIcon;
