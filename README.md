# Uneva

A modern consumer-electronics brand website built with **React + TypeScript + Vite**. Uneva is an
original brand concept (smart TVs, refrigerators, air conditioners, washing machines and kitchen
appliances) with a homepage, product catalog with filtering & sorting, support hub with FAQ and
contact form, and an about page.

> Note: This is an original design and uses original copy. It is inspired by the general structure of
> consumer-electronics sites but does not copy any other company's text, logos or images.

## Tech stack

- React 18
- TypeScript 5 (strict mode)
- Vite 5
- React Router 6

## Getting started

```bash
npm install
npm run dev      # start the dev server at http://localhost:5173
```

## Build

```bash
npm run build    # type-check + production build into /dist
npm run preview  # preview the production build
```

## Project structure

```
src/
  components/    Header, Hero carousel, ProductCard, CategoryGrid,
                 FeaturedProducts, Innovations, PromoStrip, Footer, ScrollToTop
  pages/         Home, Products, Support, About, NotFound
  data/          catalog.ts  (categories, products, banners, innovations)
  styles/        global.css  (theme tokens + base styles)
  types.ts       shared TypeScript interfaces
```

## Customizing

- **Branding / colors:** edit the CSS variables in `src/styles/global.css` (`--brand`, etc.).
- **Products & categories:** edit `src/data/catalog.ts` — everything renders from this file.
- **Images:** product visuals are CSS-generated placeholders; drop real images into `public/` and
  reference them in `ProductCard.tsx` / `Hero.tsx` when ready.
```
