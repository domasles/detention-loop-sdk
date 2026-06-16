# Detention Loop SDK

An SDK and toolset for creating the Hack Club Sprig game **Detention Loop**.

## Overview
This repository provides the source code and utilities used to build the Detention Loop game for Hack Club’s Sprig platform. It includes:

- The full JavaScript implementation of the game.
- A Python script that converts PNG assets into Sprig‑compatible character maps.

## File Structure
```
detention-loop-sdk/
├─ assets/
│  └─ png/
│  └─ xcf/
├─ branding/
│  └─ thumbnail/
├─ scripts/
│  ├─ convert_images.py
│  └─ detention_loop.js
└─ README.md
```

Every image has a corresponding .xcf file for editing

## Usage

### Converting Images
`scripts/convert_images.py` scans `assets/png` for PNG files up to **160 × 128 px**. Each pixel is mapped to a Sprig character using a predefined palette and the result is written as a JavaScript constant in `character-maps/`. The generated files can be imported directly by the game.

### Running the Game
`scripts/detention_loop.js` contains the complete Detention Loop game logic for Sprig. Import this script into a Sprig project to run the game.

### About the Game

Exhausted after a long day of school, you just want to go home. Instead, you're trapped in an endless corridor with entities trying to distort your reality. Look closely. Trust nothing. There might be a way out.

To play the game, you only need 4 buttons:
- `W` - To move forward
- `S` - To move back
- `L` - To proceed through the tutorial
- `J` - To reset the game (get back to the title screen)

If you spot an anomaly (something that should NOT exist in the given scene), you must go back. <br>
If everything seems normal, proceed! <br>
If you choose incorrectly, your score resets to 0. <br>
If chosen correctly, score increases by one. <br>
Reach 10 to win!

## Demo
A live demo of the game is available [here](https://sprig.hackclub.com/share/eG8eCsxHuKfyY7l6eada)! Feel free to check it out!

## Support
For issues, feature requests, or questions, please open an issue or submit a pull request on GitHub.

---

Built with love for the gaming community. _Open source, as intended._
