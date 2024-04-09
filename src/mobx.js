import { action, makeObservable, observable } from "mobx";
import { NUM_SELECTORS, WRITES_PER_SECOND } from "./constants";

class CountStore {
  count = 0

  constructor() {
    const annotations = {
      count: observable,
      increment: action,
    };
    for (let i = 0; i < NUM_SELECTORS; i++) {
      const key = `count${i}`;
      this[key] = `hello ${i}`
      annotations[key] = observable
    }
    makeObservable(this, annotations);
  }

  increment() {
    this.count += 1;
  }

  startHeavyWrites() {
    this.writeInterval = setInterval(() => {
      for (let i = 0; i < WRITES_PER_SECOND; i++) {
        // wrap in timeout to not perform updates synchronously
        setTimeout(() => {
          this.increment()
        }, 0)
      }
    }, 1000)
  }

  stopHeavyWrites() {
    if (!this.writeInterval) return
    clearInterval(this.writeInterval)
    this.writeInterval = null
  }
}

export const countStore = new CountStore()
