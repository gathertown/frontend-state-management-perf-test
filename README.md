# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Test results

Ran 2024-04-09 on a MBP M1.

### Redux

We created 10,000 selectors that return the same static value. Currently, we have ~1k instances of `useState` in gather-browser. We can pretend that corresponds to 1k places state is needed and selectors created if it were all in redux (which we'd never do, this is for understanding orders of magnitude). Then we 10x that for an arbitrary buffer of codebase growth.

Render time per state change: 30ms

Without any extra selectors: 1ms

### MobX

Used the same number of "selectors", creating pieces of observable state on the counter store.

Render time per state change: 0.75ms

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

Then run

```shell
npx serve -s build
```

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
