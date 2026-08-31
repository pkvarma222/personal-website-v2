# Film Data Registry Guide

All films displayed across the Filmmaker pages are maintained as modular `.json` files in this directory (`src/data/films/`).

## Directory Structure
```text
src/data/
  films/
    voicemail.json
    shine-on-us.json
    knock-knock-bang.json
    finds-you.json
    README.md
  films.js  <-- Imports all films and exports FILMS array
```

## Standard Film JSON Schema
```json
{
  "id": "my-new-film",
  "title": "My New Film Title",
  "titleImage": "/assets/film-assets/My New Film/title.png",
  "category": "Short",
  "year": "2024",
  "image": "/assets/film-assets/My New Film/backgroundImage.png",
  "director": "Manthena Pramod Kumar Varma",
  "role": "Writer, Director, Editor",
  "duration": "05:00",
  "acclaim": [
    { "stars": "AWARD NAME", "quote": "Festival Name" }
  ],
  "description": "Synopsis description text...",
  "trailerUrl": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  "credits": {
    "Writer - Director - Editor": "Manthena Pramod Kumar Varma",
    "Cast": "Actor Name 1, Actor Name 2",
    "Music from": "Provider Name"
  },
  "stills": [
    "https://images.unsplash.com/...",
    "https://images.unsplash.com/..."
  ]
}
```

## How to Add a New Film
1. Create a new `.json` file in `src/data/films/` (e.g. `my-new-film.json`).
2. Add your film assets to `/public/assets/film-assets/My New Film/`.
3. Open `src/data/films.js`, import your new `.json` file, and append it to the `FILMS` array:
   ```javascript
   import myNewFilm from './films/my-new-film.json';

   export const FILMS = [
       voicemail,
       shineOnUs,
       knockKnockBang,
       findsYou,
       myNewFilm
   ];
   ```
