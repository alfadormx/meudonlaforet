# meudonlaforet

A one-page, bilingual rental listing (French at `/`, English at `/en`) built with [`@alfadormx/blocks`](https://github.com/alfadormx/astro.blocks). It is also the starting point for new sites: use it as a GitHub template and replace the content.

## Commands

```sh
pnpm install
pnpm dev           # http://localhost:4321
pnpm build         # static site in dist/
pnpm check         # astro check: types, including the copy keys the code reads
pnpm format        # prettier --write .
pnpm check:format  # prettier --check .
```

## What lives where

| Path                                     | What it holds                                                                                   |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `astro.config.mjs`                       | The library integration, pointed at the site config and stylesheet                              |
| `src/config.yaml`                        | Site name and URL, languages (with the labels the language toggle shows), metadata per language |
| `src/styles/global.css`                  | Fonts and brand tokens: the library CSS, then `@theme` overrides of semantic tokens             |
| `src/site.ts`                            | Constants (`EMAIL_HREF`, map position, anchors) and shared block configs                        |
| `src/layouts/Layout.astro`               | Header, mobile menu, footer and language toggles around the page                                |
| `src/pages/[...lang]/index.astro`        | The page, one route per language; maps copy entries to icons and images                         |
| `src/copy/listing/<lang>.yaml`           | The page's text per language                                                                    |
| `src/copy/listing/description.<lang>.md` | The long description, referenced from the YAML                                                  |
| `src/assets/images/`                     | Photos, resolved by the `Image` block and optimised at build time                               |

The page composes library blocks through props, config layers and slots; there are no custom components. Theme changes go through the semantic tokens in `global.css` (`--color-primary`, `--color-background`, …), never raw colours.

## Copy

Page text lives in `src/copy/listing/`, read in the page and layout with `useCopy(Astro, 'listing')`. The folder name is the copy page's name.

- **`fr.yaml` is the source of truth.** French is the default language in `config.yaml`, so its file defines which keys exist, their order and their TypeScript types. Keys that exist only in `en.yaml` are ignored without a warning.
- **Missing translations fall back to French.** A key missing from `en.yaml` renders the French text and logs a build warning naming the key.
- **Order comes from `fr.yaml`.** Facts, characteristics, price rows, photos and FAQ entries are YAML maps the page iterates in key order.
- **Some keys carry meaning.** The keys of `facts`, `details.items`, `price.*.rows` and `map.nearby` pick an icon in `index.astro`, so a new key needs an icon there (`pnpm check` flags a missing one, except for price rows). The keys under `photos.tabs.*.slides` are image file names in `src/assets/images/` without `.jpg`; the value is the caption and alt text.
- **Markdown files.** A value of the form `./description.fr.md` is replaced with that file, read relative to the YAML. It renders as Markdown only where the page treats the value as rich text.
- **`{{email}}`** in copy is a placeholder this site replaces with `EMAIL_HREF` (`withEmail()` in `src/site.ts`); it is not a library feature.

Not everything visible is in `src/copy/`: the language names in the toggles (`i18n.languages[].label`), the page title template, description and Open Graph text come from `src/config.yaml`.

## Contact links

There is no public address yet, so `EMAIL_HREF` in `src/site.ts` is `'#'`. While it is, the contact buttons ("Postuler", "Envoyer mon dossier", "Poser une question") render disabled and the footer's "Écrire par email" renders as muted text. Set `EMAIL_HREF` to a `mailto:` address and they all become links. The inline links in the candidature text and FAQ intro use the same value.

## Starting a new site from it

1. Create a repository from this template on GitHub, clone it and run `pnpm install`.
2. Edit `src/config.yaml`: site name and URL, languages, metadata. The default language's YAML file becomes the one that defines the copy keys.
3. Replace the copy in `src/copy/listing/` and the photos in `src/assets/images/`. To rename the copy page, rename the folder and every `'listing'` reference: the `useCopy` calls and `AstroBlocks.CopyRegistry['listing']` in `src/site.ts`.
4. Adjust fonts and tokens in `src/styles/global.css`.
5. Rewrite `src/pages/[...lang]/index.astro` with the blocks your page needs. The block reference is at <http://astroblocks.alfador.mx/documentation>.

## Upgrading the library

The library is installed from a git tag:

```json
"@alfadormx/blocks": "github:alfadormx/astro.blocks#v0.1.1&path:packages/blocks"
```

Change the tag, run `pnpm install`, and read the library's `packages/blocks/CHANGELOG.md` for every version in between first.

## Known workarounds

These cover gaps in `@alfadormx/blocks` v0.1.0 and can go once the library fixes them.

- `astro.config.mjs` pre-bundles Leaflet (`optimizeDeps.include`) so the `Map` block works in `pnpm dev`; the production build does not need it.
- The mobile menu sets `bg-background` on the `Modal`, whose default panel colour ignores the theme tokens.
- The `Footer` gets explicit `footnoteClass` and spacing, since its defaults use an undefined `text-subtle` colour and a right margin.
