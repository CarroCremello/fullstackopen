import { create } from 'zustand'

const useCounterStore = create(set => ({
    counters: {
        good: 0,
        neutral: 0,
        bad: 0
    },
    actions: {
        good: () => set(state => ({ counters: { ...state.counters, good: state.counters.good + 1 } })),
        neutral: () => set(state => ({ counters: { ...state.counters, neutral: state.counters.neutral + 1 } })),
        bad: () => set(state => ({ counters: { ...state.counters, bad: state.counters.bad + 1 } })),
    }  
}))

// the hook functions that are used elsewhere in app
export const useCounters = () => useCounterStore(state => state.counters)
export const useCounterControls = () => useCounterStore(state => state.actions)

export const useAll = () => useCounterStore(({ counters: { good, neutral, bad } }) =>
    good + neutral + bad
)

export const useAverage = () => useCounterStore(({ counters: { good, neutral, bad } }) => {
    const total = good + neutral + bad
    return total === 0 ? 0 : (good - bad) / total
})

export const usePositive = () => useCounterStore(({ counters: { good, neutral, bad } }) => {
    const total = good + neutral + bad
    return total === 0 ? 0 : (good / total) * 100
})