import { fetchWebApi } from "./fetchWebApi";
import { addTrackToPlaylist } from "./searchMusic";

export async function getTopTracks(token) {
  return (await fetchWebApi(
    `${token}`,
    'v1/me/top/tracks?time_range=long_term&limit=4',
    'GET'
  )).items;
}

export async function topTracksList(trackItems) {
  trackItems.forEach(track => {
    addTrackToPlaylist(track);
  });
}