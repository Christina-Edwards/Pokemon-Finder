// DOM Elements
const searchBtn = document.getElementById('searchBtn');
const pokemonInput = document.getElementById('pokemonInput');
const spinner = document.getElementById('spinner');
const errorMsg = document.getElementById('errorMsg');
const pokemonCard = document.getElementById('pokemonCard');

// Event Listener
searchBtn.addEventListener('click', async () => {
  const query = pokemonInput.value.trim().toLowerCase();
  if (!query) return;

  // Reset UI
  spinner.classList.remove('d-none');
  errorMsg.classList.add('d-none');
  pokemonCard.innerHTML = '';

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`);
    const data = response.data;

    // Extract data
    const name = data.name;
    const id = data.id;
    const weight = data.weight;
    const height = data.height;
    const types = data.types.map(t => t.type.name).join(', ');
    const image = data.sprites.other['official-artwork'].front_default;

    // Create Bootstrap card
    const cardHTML = `
      <div class="card mx-auto" style="width: 18rem;">
        <img src="${image}" class="card-img-top" alt="${name}">
        <div class="card-body">
          <h5 class="card-title text-capitalize">${name}</h5>
          <p class="card-text">
            <strong>ID:</strong> ${id}<br>
            <strong>Height:</strong> ${height}<br>
            <strong>Weight:</strong> ${weight}<br>
            <strong>Types:</strong> ${types}
          </p>
        </div>
      </div>
    `;
    pokemonCard.innerHTML = cardHTML;
  } catch (error) {
    errorMsg.textContent = 'Pokémon not found. Please try again.';
    errorMsg.classList.remove('d-none');
  } finally {
    spinner.classList.add('d-none');
  }
});

