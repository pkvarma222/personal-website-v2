/**
 * FILMS DATA REGISTRY
 * Each film is maintained in its own modular JSON file inside ./films/
 * 
 * HOW TO ADD A NEW FILM:
 * 1. Create a new JSON file in src/data/films/ (e.g. `my-new-film.json`).
 * 2. Import it in this file and add it to the FILMS array below.
 */

import voicemail from './films/voicemail.json';
import shineOnUs from './films/shine-on-us.json';
import knockKnockBang from './films/knock-knock-bang.json';
import findsYou from './films/finds-you.json';

export const FILMS = [
    voicemail,
    shineOnUs,
    knockKnockBang,
    findsYou
];

export default FILMS;
