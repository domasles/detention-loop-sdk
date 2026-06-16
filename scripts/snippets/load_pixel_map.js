/*
loadPixelMap(pixelArray)

Arguments:
- pixelArray: A 2D array of strings, where each string represents a row of pixel data.

This function takes a 2D array of strings representing pixel data and converts it into a format suitable for use with the setLegend and setMap functions in the Sprig Engine.
Each string in the input array should represent a row of pixels, where each character corresponds to a pixel's color that maps like:
  '0' -> Black
  'L' -> Dark Gray
  '1' -> Light Gray
  '2' -> White
  '3' -> Red
  'C' -> Brown
  '7' -> Light Blue
  '5' -> Dark Blue
  '6' -> Yellow
  'F' -> Gold
  '4' -> Light Green
  'D' -> Dark Green
  '8' -> Pink
  'H' -> Purple
  '9' -> Orange
  '.' -> Transparent
*/

const DYNAMIC_LEGEND_AVAILABLE_SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz;<>'?,/^-!@#$%|&*()_=+[{]}:+"

function loadPixelMap(pixelArray) {
  let numRows = pixelArray.length
  let numCols = 0

  for (let i = 0; i < numRows; i++) {
    if (numCols < pixelArray[i].length)
      numCols = pixelArray[i].length
  }

  if (numCols > 160 || numRows > 128)
    throw new Error("Map dimensions exceed the maximum allowed size of 160x128 pixels.")

  let tileRows = Math.ceil(numRows / 16)
  let tileCols = Math.ceil(numCols / 16)

  let dynamicLegend = []
  let uniqueBitmaps = {}
  let symbolIndex = 0

  let tileContainers = new Array(tileCols).fill(null).map(() => [])
  let mapRows = []

  for (let y = 0; y < numRows; y++) {
    let rowData = pixelArray[y]

    for (let col = 0; col < tileCols; col++) {
      let startX = col * 16
      let chunkSegment = rowData.substring(startX, startX + 16)

      if (chunkSegment.length < 16)
        chunkSegment = chunkSegment.padEnd(16, "0")

      tileContainers[col].push(chunkSegment)
    }

    if ((y + 1) % 16 === 0 || y === numRows - 1) {
      let mapRowText = ""

      for (let col = 0; col < tileCols; col++) {
        let bitmapString = tileContainers[col].join("\n")

        if (!uniqueBitmaps[bitmapString]) {
          let assignedChar = DYNAMIC_LEGEND_AVAILABLE_SYMBOLS[symbolIndex]

          if (!assignedChar)
            throw new Error("Ran out of unique symbols for the map legend. Please reduce the number of unique tiles.")

          uniqueBitmaps[bitmapString] = assignedChar
          symbolIndex++

          dynamicLegend.push([assignedChar, bitmap`${bitmapString}`])
        }

        mapRowText += uniqueBitmaps[bitmapString]
      }

      mapRows.push(mapRowText)
      tileContainers = tileContainers.map(() => [])
    }
  }

  setLegend(...dynamicLegend)
  setMap(map`${mapRows.join("\n")}`)
}
