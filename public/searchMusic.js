import { fetchWebApi } from "./fetchWebApi";
import { criarIframe } from "./base";

export let selectedTracks = [];
export let selectedTracksIds = [];


export async function searchMusic(token, search) {
  return (await fetchWebApi(
    `${token}`,
    `v1/search?q=${search}&type=track&limit=10`,
    'GET'
  ));
}

export async function showSearch(searchResults) {
  // Obtém a área onde os resultados serão exibidos
  const resultsContainer = document.getElementById('searchContent');

  // Limpa os resultados anteriores
  resultsContainer.innerHTML = '';

  // Verifica se há resultados
  if (searchResults.tracks && searchResults.tracks.items.length > 0) {
    searchResults.tracks.items.forEach(track => {
      // Cria um contêiner para cada resultado
      const trackElement = document.createElement('div');
      const albumTrack = document.createElement('div');
      trackElement.classList.add('result-item');

      // Cria a imagem do álbum
      const albumImage = document.createElement('img');
      albumImage.src = track.album.images[0]?.url || ''; // Pega a primeira imagem disponível
      albumImage.alt = track.name;
      albumImage.width = 64; // Define o tamanho da imagem
      albumImage.height = 64;

      // Cria o nome da música
      const trackName = document.createElement('p');
      trackName.textContent = `${track.name}`;
      
      // Cria o nome do artista
      const artistName = document.createElement('p');
      artistName.textContent = `${track.artists[0].name}`;

      // Adiciona os elementos criados ao contêiner
      trackElement.appendChild(albumImage);
      trackElement.appendChild(albumTrack)
      albumTrack.appendChild(trackName);
      albumTrack.appendChild(artistName);

      // Adiciona o evento de clique para adicionar a música à playlist
      trackElement.addEventListener('click', () => {
        addTrackToPlaylist(track);
        criarIframe(selectedTracks)
        // Adiciona a música ao array de selecionadas
      });

      // Adiciona o contêiner do resultado à área de resultados
      resultsContainer.appendChild(trackElement);
    });
  }
}

export function addTrackToPlaylist(track) {
  // Verifica se a música já está na lista
  const isAlreadySelected = selectedTracks.some(selectedTrack => selectedTrack.id === track.id);

  if (!isAlreadySelected) {
    selectedTracks.push(track);
    selectedTracksIds.push(track.id); // Adiciona a música ao array
  }
  return selectedTracks
}

export function deleteTrackPlaylist(track){
  const isAlreadySelected = selectedTracks.some(selectedTrack => selectedTrack.id === track.id);
  if (isAlreadySelected) {
    selectedTracksIds = selectedTracksIds.filter(item => item !== track.id);
    selectedTracks = selectedTracks.filter(item => item !== track);
  }
  
}


