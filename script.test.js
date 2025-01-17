const {
  fetchAllPlayers,
  fetchSinglePlayer,
  addNewPlayer,
  removePlayer,
  renderAllPlayers,
  renderSinglePlayer,
  renderNewPlayerForm,
} = require("./script2");

describe("fetchAllPlayers", () => {
  // Make the API call once before all the tests run
  let players;
  beforeAll(async () => {
    players = await fetchAllPlayers();
  });

  test("returns an array", async () => {
    expect(array.isArray(players)).toBe(true);
  });

  test("returns players with name and id", async () => {
    players.forEach((player) => {
      expect(player).toHaveProperty("name");
      expect(player).toHaveProperty("id");
    });
  });
});

// TODO: Tests for `fetchSinglePlayer`

// TODO: Tests for `addNewPlayer`

describe("addNewPlayer", ()=>{
  let players;
  const player ={
    name: "Test",
    breed: "Test Breed"
  }
  beforeAll (async() =>{
    await addNewPlayer (player)
    players = await fetchAllPlayers ();

  });
  test("player is included in the player list", async ()=>{
    expect(players).toEqual(expect.arrayContaining([expect.objectContaining({name:player.name})]))
    expect(players).toEqual(expect.arrayContaining([expect.objectContaining({name:player.breed})]))

  })
}

// (Optional) TODO: Tests for `removePlayer`
describe ("removePlayer", ()=>{
  let players;
  const player= {
    name: "test",
    breed: "test breed"

  }
  beforeAll(async()=>{
    await removePlayer(player)
    players = await fetchAllPlayers();
  });
  test ("is player still there?", async () =>{
    expect(players).toEqual(expect.arrayContaining([ex[expect.objectContaining({name: player.name})]]))
  })
})