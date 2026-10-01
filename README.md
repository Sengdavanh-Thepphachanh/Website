# Website

Portfolio and printable HTML CV for Dr. Sengdavanh Thepphachanh.

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
- Header links reach Projects, Publications, and the CV. Contact opens LinkedIn.
- The complete project picture has separate beaver and crab regions.
- The beaver region opens BIBOB. The crab region opens CLANCY.
- Hover and keyboard focus highlight the corresponding animal region.
- Tiles open with a click, Enter, or Space.
- Escape, Close, the backdrop, and a click on a non-interactive dialog surface close the dialog.
- Source links and selected text keep the dialog open.
- Closing restores focus to the tile.
- Fine-pointer devices show a crab with Info on tiles and a beaver with Close on closable dialog surfaces.
- The native cursor remains elsewhere. Touch users have visible Info and Close controls.
- The index and CV have no horizontal overflow. Dialog content scrolls within the screen.
- Publication shapes and text occupy separate areas.
- The page uses a light theme. It contains no email link or upper-right arrow glyphs.

## Content and assets

`index.html` contains the project picture, publication records, source links, and static dialogs.
`assets/site.css` contains the responsive mosaics and cursor rules.
`assets/site.js` connects the tile buttons to native dialogs.
`cv.html` uses Matthew's standalone CV format, with Sengdavanh's supplied profile and research records.
The CV preserves the serif body, sans section labels, slate accent, A4 sheet, and print rules.

The approved background is stored unchanged as `assets/images/hero.png`.

The index uses Fraunces for headings and publication titles, and Sora for body text.
Both variable fonts come from [Google Fonts](https://fonts.google.com/) and are served from `assets/fonts/`.
The fonts use the SIL Open Font License 1.1, included as `OFL-Fraunces.txt` and `OFL-Sora.txt`.
Font fallbacks remain available while the local WOFF2 files load. The CV keeps its existing system fonts.

The publications use the supplied ResearchGate links and linked publisher, IAHR, and TU Dresden records.
The 2023 connectivity paper follows the IAHR record rather than the copied ResearchGate date.
Online publication dates remain distinct from later journal issue dates.
The two 2022 preprints appear as earlier versions within the stream habitat article dialog.

CLANCY and BIBOB descriptions link to their TU Dresden project pages.
Project descriptions concern the research teams and do not claim that Sengdavanh leads either project.

Serve this directory from any static host, including GitHub Pages. All local URLs are relative.
