# Paradise Nursery Shopping Application

A responsive React and Redux Toolkit houseplant shop built for the Paradise Nursery final project.

## Features

- Landing page with the Paradise Nursery name, background image, company details, and Get Started button.
- 18 unique houseplants: six each in Easy-care favorites, Tropical foliage, and Succulents & cacti.
- Local SVG botanical thumbnails, plant names, descriptions, and USD prices.
- Add to Cart buttons disable when a plant is in the cart and re-enable when it is deleted.
- Shared Home, Plants, and Cart navigation with a live total quantity badge.
- Cart thumbnails, unit prices, quantity controls, per-plant totals, total items, and total cart amount.
- Delete, Continue Shopping, and demonstration Checkout with a Coming Soon message.
- Responsive styling, accessible control labels, and reduced-motion support.

## Run locally

Requires Node.js 22 and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Use `npm run build` for a production build and `npm run preview` to preview it.

## Verification

```sh
npm test
npm run build
npx playwright install chromium
npx playwright test
```

The GitHub Actions workflow runs reducer/catalog tests, a production build, and browser shopping-flow tests. Browser tests cover adding products, disabled buttons, navigation, quantities, totals, deleting, checkout messaging, empty carts, local images, and mobile overflow.

## Project files

| Task | File |
| --- | --- |
| 1 | [README.md](README.md) |
| 2 | [AboutUs.jsx](src/AboutUs.jsx) |
| 3 | [App.css](src/App.css) |
| 4 | [App.jsx](src/App.jsx) |
| 5 | [CartSlice.jsx](src/CartSlice.jsx) |
| 6 | [ProductList.jsx](src/ProductList.jsx) |
| 7 | [CartItem.jsx](src/CartItem.jsx) |

See [SUBMISSION_URLS.md](SUBMISSION_URLS.md) for the seven file URLs to submit.

## Notes

Plant thumbnails and the landing-page greenhouse background are original decorative SVG illustrations included in this repository. Thumbnails are stylized illustrations rather than identification photographs. Google Fonts are optional; system fonts are used if unavailable. Cart state lasts for the current browser session and resets on page refresh. Checkout is a demonstration and does not process payments.
