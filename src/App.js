import { observer } from "mobx-react-lite";
import { increment, massiveSelectorsArray, useCountSelector } from "./redux";
import { useDispatch, useSelector } from "react-redux";
import { countStore } from "./mobx";
import { NUM_SELECTORS, WRITES_PER_SECOND } from "./constants";
import React from "react";

// Pull out dummy component so that React doesn't need to do re-render work. This isolates the computation to just
// the selectors checking whether they need to trigger a re-render.
const DummyComponentThatWontRerenderRedux = React.memo(() => {
  for (let i = 0; i < massiveSelectorsArray.length; i++) {
    // this is run synchronously every time in the right order, it's okay
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSelector(massiveSelectorsArray[i])
  }
  return <div>Dummy</div>
})

let writeInterval = null
const ReduxExperiment = () => {
  const count = useCountSelector()
  const dispatch = useDispatch()
  return (
    <div>
      <h2>Redux</h2>
      <DummyComponentThatWontRerenderRedux />
      <div>Count: {count}</div>
      <button onClick={() => {
        dispatch(increment())
      }}>
        Click
      </button>
      <div>
        <button onClick={() => {
          writeInterval = setInterval(() => {
            for (let i = 0; i < WRITES_PER_SECOND; i++) {
              // wrap in timeout to not perform updates synchronously
              setTimeout(() => {
                dispatch(increment())
              }, 0)
            }
          }, 1000)
        }}>
          Start heavy writes
        </button>
        <button onClick={() => {
          if (!writeInterval) return
          clearInterval(writeInterval)
          writeInterval = null
        }}>
          Stop heavy writes
        </button>
      </div>
    </div>
  );
}

const SmallComponent = React.memo(({ index }) => {
    return <div/>
  }
)

const SmallMobXObserver = observer(({ index }) => {
  // eslint-disable-next-line no-unused-expressions
  countStore.stateThatDoesNotChange
  return <div/>
})

// Pull out dummy component so that React doesn't need to do re-render work. This isolates the computation to just
// the selectors checking whether they need to trigger a re-render.
const DummyComponentThatWontRerenderMobX = observer(() => {
  for (let i = 0; i < NUM_SELECTORS; i++) {
    // simply de-referencing the observable is enough to count as needing to observe
    // eslint-disable-next-line no-unused-expressions
    countStore[`count${i}`]
  }
  return <div>Dummy</div>
})

const MobXExperiment = observer(() => {
  return (
    <div>
      <h2>MobX</h2>
      <DummyComponentThatWontRerenderMobX/>
      <div>Count: {countStore.count}</div>
      <button onClick={() => countStore.increment()}>
        Click
      </button>
      <div>Other counts: {countStore.count1}, {countStore.count2}</div>
      <div>
        <button onClick={() => countStore.startHeavyWrites()}>
          Start heavy writes
        </button>
        <button onClick={() => countStore.stopHeavyWrites()}>
          Stop heavy writes
        </button>
      </div>

      {/*
        * When rendering a large number of components, it takes roughly the same time for React to re-render, regardless
        * of whether it's a MobX observer or not. Compare performance by uncommenting each of these lines in isolation
        */}
      {/*{[...Array(NUM_SELECTORS)].map(i => (<SmallMobXObserver key={i} index={i} />))}*/}
      {/*{[...Array(NUM_SELECTORS)].map(i => (<SmallComponent key={i} index={i} />))}*/}
    </div>
  );
})


const PerformanceComparison = () => (
  <div>
    <ReduxExperiment/>
    <MobXExperiment/>
  </div>

)

function App() {
  return <PerformanceComparison/>
}

export default App;
