// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2409-GHP-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

// === State ===
const state = {
  players: [], // fetchAllPlayers
  player: {}, // fetchSinglePlayer
  teams: [], //
};

// === REFERENCES ===
const form = document.getElementById("new-player-form");

/** === FETCH ALL PLAYERS FROM API ===
 * @returns {Object[]} the array of player objects
 * make sure to renderfetchAllPlayers() at bottom of code.
 */
const fetchAllPlayers = async () => {
  try {
    // why do we nest if throw in try catch?
    const response = await fetch(`${API_URL}/players`);
    const result = await response.json();
    console.log("fetched result", result); // this fetches the sample response in the API

    if (!response.ok) {
      // what is diff bet response.ok and success?
      throw new Error(result.error || "Failed to fetch players");
    }

    state.players = result.data.players; // returns the array that has puppy data
    // result.data.players works. bc state assignment
    // return response.data.players; // does not work

    console.log("Players to render:", state.players);

    // renderAllPlayers();
    // return state.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

/** === FETCH SINGLE PLAYER FROM API ===
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    const promise = await fetch(API_URL + "/players/" + playerId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await promise.json();
    state.player = response.data.player;
    console.log(response);
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

/** == ADD NEW PLAYER TO ROSTER VIA API ===
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(`${API_URL}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerObj),
    });

    if (!response.ok) {
      throw new Error("Cannot add new player", error);
    }

    await fetchAllPlayers();
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

/** === REMOVE SINGLE PLAYER FROM ROSTER VIA API ===
 * @param {number} playerId the ID of the player to remove
 */
const removePlayer = async (playerId) => {
  try {
    const response = await fetch(
      `${API_URL}` + "/players/" + playerId, // is this correct?
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(result);
    render();
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

// FETCH TEAM IDs from API

// EVENT LISTENER here?

// == RENDERS ===
/** === RENDER ALL PLAYERS <main> ===
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
 *
 * fishglitch's notes:
 * <main> is the main content of the page
 * <article> is a specific self contained piece of content
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article
 */

// borrowed line below from REFERENCE section to help complete function below
const playerList = document.getElementById("playerList"); // <main><article>
const playerCard = document.createElement("playerCardArea");

function renderAllPlayers(players) {
  playerList.innerHTML = ""; // Clear previous content

  if (!state.players || state.players.length === 0) {
    playerList.innerHTML = "<p>No players found :(</p>";
    return;
  }

  const playersHTML = state.players.map(player => {
    console.log("map", player);
  
    playerCard.innerHTML = `
      <div>
        <h1>${player.name}</h1>
        <p>Player ID: ${player.id}</p>
      </div>
    `;

    playerList.append(playerCard);
    console.log("Card", playerCard.innerHTML);

    // const image = document.createElement("img");
    // image.src = player.imageUrl;
    //playerCard.append(image);

    // eventListener for DETAILS

    const buttonDetails = document.createElement("button");
    buttonDetails.innerText = "Player Details";
    playerCard.appendChild(buttonDetails);
    buttonDetails.addEventListener("click", async () => {
      await fetchSinglePlayer(player.id);
      renderSinglePlayer(state.player);
      return playerCard;
    });

    playerList.innerHTML = playersHTML;

    console.log("Players rendered:", playersHTML);
  });
};

/* junk code to review if needed
  // 
  // playerList.forEach((player) => {
  //   const playerCard = document.createElement("div");
  //   playerCard.classList.add("player-card");
  //   playerCard.innerHTML = `
  //     <h3>${player.name}</h3>
  //     <img src="${player.image}" alt="${player.name}" />
  //     <button onclick="renderSinglePlayer(${player.id})">See details</button>
  //     <button onclick="removePlayer(${player.id})">Remove from roster</button>
  //   `;
  //   main.appendChild(playerCard);
  // });
*/
/** === DISPLAY SINGLE PLAYER <main> ===
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
  //   const details = document.createElement("section");
  //   details.innerHTML = `
  //   <h3>${player.name}</h3>
  //    <p>Player ID: ${player.id} </p>
  //     <p>Player Status: ${player.status}<p>
  //     <p>Team ID: ${player.teamId}</p>
  // `;
  //   // Image Set Up:
  //   const image = document.createElement("img");
  //   //set the img src to be the imageUrl from the player object
  //   image.src = player.imageUrl;
  //   image.style.width = "50%";
  //   image.style.height = "50%";
  //   details.append(image);
  //   const backButton = document.createElement("button");
  //   backButton.innerText = "Back to Roster";
  //   details.append(backButton);
  //   backButton.addEventListener("click", () => render());
  //   playerList.replaceChildren(details);
};

/* === RENDER NEW PLAYERS USING DOM from FORM ===
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 TODO
  - grab the form from the html via the DOM:
      const form = document.getElementById("new-player-form");
  - on submit of the form, add event listener that will grab the data
  - from the form, and construct a player object and send that player object as 
      an argument to the addNewPlayer function
 */

const renderNewPlayerForm = () => {
  // write a template literal use back ticks
  const newPlayerForm = `
    <style>
      input::placeholder {
        font-size: 0.8em;
        font-style: italic;
      } 
    </style>
    <label for="name">Name:</label>
    <input 
      type="text" 
      id="name" 
      name="name" 
      placeholder="Puppy Name"
      required
      />

    <label for="breed">Breed:</label>
    <input 
      type="text" 
      id="breed" 
      name="breed" 
      placeholder="Puppy Breed"
      required
      />
    <label for="url">Image URL:</label>
    <input 
      type="text"
      id="url"
      name="url"
      placeholder="Puppy URL Image"
      />
    <select name="status" id="status">
      <option value="field">Field</option>
      <option value="bench">Bench</option>
    </select>

    <select name="team" id="team">
      <option value="unassigned"></option>
      <option value="ruff">Ruff</option>
      <option value="fluff">Fluff</option>
    </select>

    <input type="submit" id="submit" />`;
  form.innerHTML = newPlayerForm;
  //   }
  // } catch (err){
  //   console.error("Uh oh, trouble rendering the new player form!", err);

  // === EVENT LISTENER ===
  // should this be here
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const playerData = {
      name: form.elements.name.value,
      breed: form.elements.breed.value,
      image: form.elements.url.value,
      status: form.elements.status.value,
      team: form.elements.team.value,
    };
    await addNewPlayer(playerData);
    form.reset();
    console.log("New Player Data entered:", playerData);
  });
};

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  await fetchAllPlayers();
  renderNewPlayerForm();
};

// used to refresh the player list displayed on the page.
// It may be called multiple times after player data is modified
// (for example, after adding or removing a player).

async function render() {
  await fetchAllPlayers(); // you are invoking the function here
  renderAllPlayers();
}

// fetchAllPlayers will send a request to fetch the data
render();

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
