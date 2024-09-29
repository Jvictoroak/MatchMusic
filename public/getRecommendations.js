import { fetchWebApi } from "./fetchWebApi";

let recommendedTracks = []

export async function getRecommendations(token, topTracksIds, limit) {
  return (await fetchWebApi(
    `${token}`,
    `v1/recommendations?limit=${limit}&seed_tracks=${topTracksIds.join(',')}`,
    'GET'
  )).tracks;
}

export async function recommendationsList(recommended) {
  const container = document.getElementById("tracks-container-recommended");
  const iframes = container.querySelector("iframe");
  
  recommended?.forEach(track => {
    recommendedTracks.push({ nome: track.name, id: track.id });
      iframes.src = `https://open.spotify.com/embed/track/${track.id}?utm_source=generator`;
  });
}