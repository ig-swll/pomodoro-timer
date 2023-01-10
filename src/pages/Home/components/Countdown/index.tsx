import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'

import { CyclesContext } from '../../../../contexts/CyclesContext'
import { CountdownContainer, CountdownSeparator } from './styles'

export function Countdown() {
  const { activeCycle, finishActiveCycle, elapsedTime, updateElapsedTime } =
    useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const totalRemainingSeconds = activeCycle ? totalSeconds - elapsedTime : 0

  const remainingMinutes = String(
    Math.floor(totalRemainingSeconds / 60),
  ).padStart(2, '0')
  const remainingSeconds = String(totalRemainingSeconds % 60).padStart(2, '0')

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDiff >= totalSeconds) {
          finishActiveCycle()
          updateElapsedTime(totalRemainingSeconds)
          clearInterval(interval)
        } else {
          updateElapsedTime(secondsDiff)
        }
      }, 1000)
    }
    return () => {
      // updateElapsedTime(0)
      clearInterval(interval)
    }
  }, [
    activeCycle,
    finishActiveCycle,
    totalRemainingSeconds,
    totalSeconds,
    updateElapsedTime,
  ])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${remainingMinutes}:${remainingSeconds} - ${activeCycle.task}`
    }

    return () => {
      document.title = 'Pomodoro Timer'
    }
  }, [remainingMinutes, remainingSeconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{remainingMinutes[0]}</span>
      <span>{remainingMinutes[1]}</span>
      <CountdownSeparator>:</CountdownSeparator>
      <span>{remainingSeconds[0]}</span>
      <span>{remainingSeconds[1]}</span>
    </CountdownContainer>
  )
}
