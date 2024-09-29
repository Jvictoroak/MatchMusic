import { selectedTracks, selectedTracksIds, deleteTrackPlaylist} from "./searchMusic";
export async function criarIframe(arrayBase) {
  const container = document.getElementById("tracks-container-top"); // O contêiner onde os iframes serão adicionados

  // Limpa o contêiner para evitar a duplicação de iframes
  container.innerHTML = '';

  arrayBase?.forEach((track) => {
    // Cria uma nova div para cada música
    const trackDiv = document.createElement('div');
    const deleteElement = document.createElement('span');
    deleteElement.textContent = 'delete'; // Define o texto do botão
    deleteElement.classList.add('material-symbols-outlined');

    // Cria um iframe
    const iframe = document.createElement('iframe');
    iframe.src = `https://open.spotify.com/embed/track/${track.id}?utm_source=generator`;
    iframe.width = "300"; // Ajuste a largura conforme necessário
    iframe.height = "80"; // Ajuste a altura conforme necessário
    iframe.frameBorder = "0";
    iframe.allow = "encrypted-media"; // Permissões necessárias para o iframe

    // Adiciona o iframe à nova div
    trackDiv.appendChild(iframe);
    trackDiv.appendChild(deleteElement)

    // Adiciona a nova div ao contêiner
    container.appendChild(trackDiv);

    deleteElement.addEventListener('click', () => {
      deleteTrackPlaylist(track)
      trackDiv.remove()
    })
  });
}
