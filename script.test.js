/* this imports script.js functions */ 
const {
  fetchAllPlayers,
  fetchSinglePlayer,
  addNewPlayer,
  removePlayer,
  renderAllPlayers,
  renderSinglePlayer,
  renderNewPlayerForm,
} = require("./script");

/** below are Jest's testing framework/ describe() can contain one or more test()
 * 
 * this block below groups all tests related to the fetchAllPlayers function
*/
describe("fetchAllPlayers", () => {
  // Make the API call once before all the tests run
  let players;
  beforeAll(async () => {
    players = await fetchAllPlayers();
  });
// see if it makes a diff: i capitalized the "A" in the first array word; was lower case by default.
  test("returns an array", async () => {
    expect(Array.isArray(players)).toBe(true);
  });

  test("returns players with name and id", async () => {
    players.forEach((player) => {
      expect(player).toHaveProperty("name");
      expect(player).toHaveProperty("id");
    });
  });
});

// TODO: Tests for `fetchSinglePlayer`
describe("fetchSinglePlayer", () => {
  let player;
  const testId = playerId;

  beforeAll(async () => {
    player = await fetchSinglePlayer(testId);
  });

  // changed below from Object.isObject(player)
  test("returns an object", async () => {
    expect(typeof player).toBe(Object);
  });
  test("returns player with name, id, breed, image, team", async () => {
    player.forEach((player) => {
      expect(player).toHaveProperty("name");
      expect(player).toHaveProperty("id");
      expect(player).toHaveProperty("breed");
      expect(player).toHaveProperty("image");
      expect(player).toHaveProperty("team");
    });
  });
});

// TODO: Tests for `addNewPlayer`

describe("addNewPlayer", () => {
  let players;
  const player = {
    name: "Test",
    breed: "Test Breed",
    imageUrl: "test-image-url",
    status: "field", 
    team: "unassigned",
  };
  beforeAll(async () => {
    await addNewPlayer(player);
    players = await fetchAllPlayers();
  });
  test("player is included in the player list", async () => {
    expect(players).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: player.name })])
    );
    expect(players).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: player.breed })])
    );
  });
});

// (Optional) TODO: Tests for `removePlayer`
describe("removePlayer", () => {
  let players;
  const player = {
    name: "test",
    breed: "test breed",
  };
  beforeAll(async () => {
    await removePlayer(player.name);
    players = await fetchAllPlayers();
  });
  test("is player removed?", async () => {
    expect(players).not.toEqual(
      expect.arrayContaining([
        ex[expect.objectContaining({ name: player.name })],
      ])
    );
  });
});
