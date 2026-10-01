# Website

Single-page portfolio for Dr. Sengdavanh Thepphachanh.

## Preview

Run from this directory:

```sh
python3 -m http.server 8779 --bind 127.0.0.1
```

Open http://127.0.0.1:8779/. There is no build step or dependency installation.

## Check

```sh
node --check assets/site.js
node tests/check-interactions.cjs
```

Check the page at a desktop width and at 390 × 844:

- The hero text is readable, and the researcher remains visible in the artwork.
- Header links reach Projects, Publications, and Photo gallery.
- Tiles open with a click, Enter, or Space.
- Escape, Close, the backdrop, and a click on a non-interactive dialog surface close the dialog.
- Source links and selected text keep the dialog open.
- Closing restores focus to the tile.
- Fine-pointer devices show a crab with Info on tiles and a beaver with Close on closable dialog surfaces.
- The native cursor remains elsewhere. Touch users have visible Info and Close controls.
- The page has no horizontal overflow. Dialog content scrolls within the screen.

## Content and assets

`index.html` contains the project descriptions, publication records, source links, and static dialogs.
`assets/site.css` contains the responsive mosaics and cursor rules.
`assets/site.js` connects the tile buttons to native dialogs.

The approved background is stored unchanged as `assets/images/hero.png`.
The supplied portrait is stored as `assets/images/portrait.png`.
The gallery identifies the portrait and the approved artwork separately.
Replace artwork details with field photographs when those photographs are supplied.

The publications use the supplied ResearchGate links and linked publisher, IAHR, and TU Dresden records.
The 2023 connectivity paper follows the IAHR record rather than the copied ResearchGate date.
Online publication dates remain distinct from later journal issue dates.
The two 2022 preprints appear as earlier versions within the stream habitat article dialog.

CLANCY and BIBOB descriptions link to their TU Dresden project pages.
Project descriptions concern the research teams and do not claim that Sengdavanh leads either project.

Serve this directory from any static host, including GitHub Pages. All local URLs are relative.
