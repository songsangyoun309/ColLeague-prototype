# Bundled fonts

- **Chakra Petch SemiBold**: display headings. [Google Fonts source](https://github.com/google/fonts/tree/main/ofl/chakrapetch); license in `ChakraPetch-OFL.txt`.
- **Source Sans 3 variable (200–900)**: small UI labels, body text and statistics. [Adobe's official release](https://github.com/adobe-fonts/source-sans/tree/release); license in `SourceSans3-OFL.txt`. The unmodified upright WOFF2 replaces Manrope.
- **Cinzel Bold (C glyph only)**: the gold serif brand mark. [Google Fonts source](https://github.com/google/fonts/tree/main/ofl/cinzel); license in `Cinzel-OFL.txt`. The small TrueType subset is bundled locally; it does not change the body or heading fonts.

Fonts downloaded on 2026-08-28: Source Sans 3 from Adobe, Chakra Petch and Cinzel subsets from Google Fonts. They are served locally with `next/font/local`, so builds and visitors do not need a font-provider connection. System fallbacks cover characters outside these fonts.
