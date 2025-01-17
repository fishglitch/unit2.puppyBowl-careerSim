// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2409-GHP-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

// === State ===!

const state = {
  players: [],
  player: {},
  teams: [],
};

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    // TODO
    const response = await fetch(`${API_URL}/players`);
    const result = await response.json();
    if (!response.success){
      throw response.error;
    }
    return result;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(
      `${API_URL}/players/PLAYER-ID`
    );
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(
      `${API_URL}/players`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerObj),
      }
    );
    const result = await response.json();
    console.log("Player added:", result);
    return result;
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
  let form = document.querySelector("#new-player-form > form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let playerData = {
      name: form.elements.name.value,
      breed: form.elements.breed.value,
    };
    console.log("New Player Data:", playerData);

    if (n)
  })
};

/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */
const removePlayer = async (playerId) => {

  try {
    const response = await fetch(
      `${API_URL}` + "/players/1",
      {
        method: 'DELETE',
      }
    );
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */

//TODO.

const renderAllPlayers = (playerList) => {
  const main = document.querySelector('main');
  main.innerHTML = ''; // Clear previous content
  if (playerList.length === 0) {
    main.innerHTML = '<p>No players found.</p>';
    return;
  }

  playerList.forEach(player => {
    const playerCard = document.createElement('div');
    playerCard.classList.add('player-card');
    playerCard.innerHTML = `
      <h3>${player.name}</h3>
      <img src="${player.image}" alt="${player.name}" />
      <button onclick="renderSinglePlayer(${player.id})">See details</button>
      <button onclick="removePlayer(${player.id})">Remove from roster</button>
    `;
    main.appendChild(playerCard);
  });
};
/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => {

  const main = document.querySelector('main');
  main.innerHTML
};

/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
const renderNewPlayerForm = () => {
  const form = document.getElementById("new-player-form");
  form.innerHTML = `
    <label for="name"> Name: </label>
    <input type="text" name="name" required>
    <label for="breed"> Breed: </label>
    <input type="text" name="breed" required>
    <button type="submit">Submit</button>
  `;

  form.onsubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(form);
    const playerObj = {
      name: formData.get('name'),
      breed: formData.get('breed')
    };
    await addNewPlayer(playerObj);
    const players = await fetchAllPlayers(); // Fetch latest players
    renderAllPlayers(players); // Render updated players
  };
};


/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
            renderAllPlayers(players);

            renderNewPlayerForm();
};

            // This script will be run using Node when testing, so here we're doing a quick
            // check to see if we're in Node or the browser, and exporting the functions
            // we want to test if we're in Node.
            if (typeof window === "undefined") {
              module.exports = {
                fetchAllPlayers,
                fetchSinglePlayer,
                addNewPlayer,
                removePlayer,
                renderAllPlayers,
                renderSinglePlayer,
                renderNewPlayerForm,
              };
} else {
              init();
}
