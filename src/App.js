import { observer } from "mobx-react-lite";
import { increment, massiveSelectorsArray, useCountSelector } from "./redux";
import { useDispatch, useSelector } from "react-redux";
import { countStore } from "./mobx";
import { WRITES_PER_SECOND } from "./constants";

let writeInterval = null
const ReduxExperiment = () => {
  const count = useCountSelector()
  for (let i = 0; i < massiveSelectorsArray.length; i++) {
    // this is run synchronously every time in the right order, it's okay
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSelector(massiveSelectorsArray[i])
  }
  const dispatch = useDispatch()
  return (
    <div>
      <h2>Redux</h2>
      <div>Count: {count}</div>
      <button onClick={() => {
        dispatch(increment())
      }}>
        Click
      </button>
      <div>
        <button onClick={() => {
          // BIG hack
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

const MobXExperiment = observer(() => {
  return (
    <div>
      <h2>MobX</h2>
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
  return <PerformanceComparison />
}

export default App;
