# MobX vs Redux performance comparison

## Test results

Ran 2024-04-09 on a MBP M1.

### Redux

We created 10,000 selectors that return the same static value. Currently, we have ~1k instances of `useState` in browser. We can pretend that corresponds to 1k places state is needed and selectors created if it were all in redux (which we'd never do, this is for understanding orders of magnitude). Then we 10x that for an arbitrary buffer of codebase growth.

Render time per state change: 8ms

Without any extra selectors: 1ms

### MobX

Used the same number of "selectors", creating pieces of observable state on the counter store.

Render time per state change: 0.9ms

## Dev

Run with `npm start`.

For prod build, do `npm run build`, then run

```shell
npx serve -s build
```
