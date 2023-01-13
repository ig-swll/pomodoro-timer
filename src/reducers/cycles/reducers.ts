import { produce } from 'immer'

import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.CREATE_NEW_CYCLE: {
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    }
    case ActionTypes.INTERRUPT_ACTIVE_CYCLE: {
      const currentCycleIdx = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      return produce(state, (draft) => {
        draft.cycles[currentCycleIdx].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    }
    case ActionTypes.FINISH_ACTIVE_CYCLE: {
      const currentCycleIdx = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )

      return produce(state, (draft) => {
        draft.cycles[currentCycleIdx].finishedDate = new Date()
        draft.activeCycleId = null
      })
    }
    default:
      return state
  }
}
