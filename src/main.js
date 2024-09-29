// main.js

import { redirectToAuthCodeFlow } from './auth.js';
import { getAccessToken } from './token.js';
import { getTopTracks } from './topTrack.js';
import { getRecommendations, recommendationsList } from './getRecommendations.js';
import { addTrackToPlaylist, searchMusic, selectedTracksIds, showSearch } from './searchMusic.js';
import { criarIframe } from './base.js';

const clientId = import.meta.env.VITE_CLIENT_ID; // Coloque aqui o Client ID


const params = new URLSearchParams(window.location.search);
const code = params.get("code");
//mostra a área de pesquisa
if (!code) {
  redirectToAuthCodeFlow(clientId);
} else {
  const accessToken = await getAccessToken(clientId, code); //gera um token de acesso

  const topTrackItems = await getTopTracks(accessToken)
  criarIframe(topTrackItems)
  topTrackItems.forEach(track => {
    addTrackToPlaylist(track);
  });

const newRecomendation = await getRecommendations(accessToken, selectedTracksIds, 1); //gera uma recomendação de acordo com as musicas selecionadas
await recommendationsList(newRecomendation);

  document.getElementById(`replace-button`).addEventListener("click", async () => {
    if(selectedTracksIds.length>5){
      alert("Limite atingido! Você só pode selecionar até 5 músicas")
    }
    const newRecomendation = await getRecommendations(accessToken, selectedTracksIds, 1); //gera uma recomendação de acordo com as musicas selecionadas
    await recommendationsList(newRecomendation);
  });

  document.getElementById('search').addEventListener("input", async () => { //mostra a área de pesquisa
    const searchValue = document.querySelector('#search').value;
    const searchResults = await searchMusic(accessToken, searchValue);
    showSearch(searchResults);
  });
}