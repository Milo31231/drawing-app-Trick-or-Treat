# 🎃 SketchToPhoto: Trick or Treat Edition

A web drawing app, forked and expanded for **WSU Hacktoberfest Hack Day 2026** (theme: *Trick or Treat*).

**Live demo:** https://milo31231.github.io/drawing-app-Trick-or-Treat/

<!-- Replace with a screenshot of YOUR version, then delete this comment -->
![Screenshot](screenshot.png)

## What's new in this fork

### 🍬 Treats (useful features)
- **More colors**: added Orange, Dark Green, and White (White doubles as a simple eraser)
- **Brush size slider**: adjustable from 1px to 50px
- **Stamp mode**: switch from brush to stamps and drop emoji on the canvas (🎃 ⭐ ❤️ 👻 🔥)

### 🎃 Tricks (weird and fun)
- **Spooky rhythm game**: the "Click Me For A Surprise" button turns the canvas into an osu!-style game. Circles appear to the beat, and you click them (or press **Z / X**) in time.

## How to use

1. Open the live demo (or `index.html` in a browser).
2. Pick a color in the welcome popup.
3. Click and drag on the canvas to draw.
4. Use **Mode** to switch between Brush and Stamp, and the dropdown to choose a stamp.
5. Use the **Size** slider to change brush or stamp size.
6. **CLEAR** wipes the canvas and **SAVE** shows your drawing as an image below it.
7. Hit the pumpkin button to play the rhythm game.

## Run it locally

No install needed. It's plain HTML, CSS, and JavaScript.

```bash
git clone https://github.com/milo31231/drawing-app-Trick-or-Treat.git
cd drawing-app-Trick-or-Treat
# then open index.html in your browser
```

## Built with

HTML, CSS, JavaScript (HTML5 Canvas)

## AI disclosure

I'm new to coding and used **Claude** (Anthropic) to help me understand the original codebase, debug, and write parts of the stamp mode, color additions, and rhythm game. I tested and integrated everything myself.

## Credits

- **Original project:** [sudipt1999/drawing-app](https://github.com/sudipt1999/drawing-app), a college project the author invited others to extend (erase, fill, colors, and more)
- **Rhythm game:** inspired by the gameplay of [osu!](https://osu.ppy.sh). This project is not affiliated with osu! or ppy.
- **Music:** `song.mp3`: TODO: add title, artist, source, and license (e.g. "Track Name by Artist, Pixabay License")
- **Sound effects:** `hit-sound.wav`, `yay.mp3`: TODO: add source and license
- **Rhythm map:** TODO: say whether you made it or where it came from

## Contributing

Ideas for future features: a real eraser, undo/redo, a fill tool, more stamps, and more beatmaps. Pull requests welcome!

## Team

- Team name: TODO
- Members: TODO
