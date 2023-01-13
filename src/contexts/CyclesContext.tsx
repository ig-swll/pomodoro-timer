import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'

import {
  createNewCycleAction,
  finishActiveCycleAction,
  interruptActiveCycleAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducers'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  elapsedTime: number
  updateElapsedTime: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  finishActiveCycle: () => void
  interruptActiveCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ children }: { children: ReactNode }) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycle: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@pomodoro-timer:cycles-state_1.0.0',
      )
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
    },
  )

  const activeCycle = cyclesState.cycles.find(
    ({ id }) => id === cyclesState.activeCycleId,
  )

  const [elapsedTime, setElapsedTime] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@pomodoro-timer:cycles-state_1.0.0', stateJSON)
  }, [cyclesState])

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(createNewCycleAction(newCycle))
  }

  function interruptActiveCycle() {
    dispatch(interruptActiveCycleAction())
  }

  function finishActiveCycle() {
    dispatch(finishActiveCycleAction())
  }

  function updateElapsedTime(seconds: number) {
    setElapsedTime(seconds)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles: cyclesState.cycles,
        activeCycle,
        activeCycleId: cyclesState.activeCycleId,
        elapsedTime,
        finishActiveCycle,
        updateElapsedTime,
        createNewCycle,
        interruptActiveCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
