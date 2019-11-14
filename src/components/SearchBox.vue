<template>
  <div class="SearchBox">
    <!-- <input type="text" name="playername" placeholder="playername" /> -->
    <div>
      <label>
        Player name:
        <input type="text" v-model="playername">
      </label>
    </div>
    <div>
      <label>
        Tournament:
        0.<input type="number" min="1" max="24" step="1" v-model="tournament">
      </label>
    </div>
    <div>
      <label>
        Number:
        From: <input type="number" step="1" v-model="gameIdxFrom"> 
        To: <input type="number" step="1" v-model="gameIdxTo"> 
      </label>
    </div>
    <input type="text" readonly v-model="query" />
    <div>
      <button @click="doSearch">Do Search</button>
    </div>
    <hr>
    <textarea class="results" v-model="results"></textarea>
  </div>
</template>

<script>


// API Docs:
// https://github.com/crawl/sequell/blob/master/docs/listgame.md
const SEQUELL_API = 'https://loom.shalott.org/api/sequell'

async function getGame(gameIdx) {
  const q = `!lg * t0.24 won ${gameIdx}`
  const resp = await fetch(`${SEQUELL_API}/game?q=${q}`)
  const json = await resp.json()
  const game = json.records[0]
  const result = {
      "game_key": game["game_key"],
      // "hash": game["hash"],
      "name": game["name"],
      "race": game["race"],
      "cls": game["cls"],
      "char": game["char"],
      "xl": game["xl"],
      "god": game["god"],
      "start": game["start"],
      "end": game["end"],
      "dur": game["dur"],
      "turn": game["turn"],
      "urune": game["urune"],
  }
  return result
}

export default {
  name: 'SearchBox',
  data: function() {
    return {
      results: '',
      tournament: '24',
      playername: '*',
      gameIdxFrom: 1,
      gameIdxTo: 1
    }
  },
  computed: {
    query: function() {
      // return 'hello'
      return `!lg ${this.playername} t0.${this.tournament} won`
    }
  },
  methods: {
    doSearch: async function() {
      const results = [];
      for (let i=this.gameIdxFrom; i<=this.gameIdxTo; i++) {
        console.log(`getting game ${i}`)
        const result = await getGame(i)
        results.push(result)
      }
      this.results = JSON.stringify(results);
    }
  }
}
</script>

<style scoped lang="scss">

</style>
