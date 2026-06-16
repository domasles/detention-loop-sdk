/*
transitionMap(map, legend, rowDelay, columnDelay)

Arguments:
- map: A map literal representing the new map to transition to.
- legend: An array of [symbol, bitmap] pairs representing the legend for the new map.
- rowDelay: The delay in milliseconds between each row being revealed during the transition.
- columnDelay: The delay in milliseconds between each column being revealed during the transition.

This function creates a transition effect when loading a new map in the Sprig Engine.
It takes a map to transition to, its corresponding legend and overlays the current map row by row with a specified delay between each row and column before making the new map appear.
The current loaded map MUST have a tile that's used for the transition effect (e.g. a black tile).
*/

const BLACK_TILE = "~"

const GLOBAL_LEGEND = [
[BLACK_TILE, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
]

function transitionMap(map, legend, rowDelay, columnDelay) {
  if (isTransitioning) return

  isTransitioning = true

  const WIDTH = width()
  const HEIGHT = height()

  if (HEIGHT <= 1) {
    setLegend(...legend)
    setMap(map)

    isTransitioning = false

    return
  }

  let row = 0

  function revealRows() {
    if (row >= HEIGHT) {
      const totalSweepTime = WIDTH * columnDelay

      setTimeout(() => {
        setLegend(...legend)
        setMap(map)

        isTransitioning = false
      }, totalSweepTime)

      return
    }

    for (let col = 0; col < WIDTH; col++) {
      let currentRow = row
      let currentCol = col

      setTimeout(() => {
        const TILE = getTile(currentCol, currentRow)

        if (TILE && TILE[0])
          TILE[0].type = "~"
      }, col * columnDelay)
    }

    row++
    setTimeout(revealRows, rowDelay)
  }

  revealRows()
}
