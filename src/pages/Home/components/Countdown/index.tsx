import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'

import { CyclesContext } from '../../../../contexts/CyclesContext'
import { CountdownContainer, CountdownSeparator } from './styles'

export function Countdown() {
  const { activeCycle, finishActiveCycle, elapsedTime, updateElapsedTime } =
    useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondsDiff >= totalSeconds) {
          finishActiveCycle()

          updateElapsedTime(totalSeconds)
          clearInterval(interval)
        } else {
          updateElapsedTime(secondsDiff)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, finishActiveCycle, totalSeconds, updateElapsedTime])

  const totalRemainingSeconds = activeCycle ? totalSeconds - elapsedTime : 0

  const minutes = Math.floor(totalRemainingSeconds / 60)
  const seconds = totalRemainingSeconds % 60

  const minutesStr = String(minutes).padStart(2, '0')
  const secondsStr = String(seconds).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesStr}:${secondsStr} - ${activeCycle.task}`
    }

    return () => {
      document.title = 'Pomodoro Timer'
    }
  }, [minutesStr, secondsStr, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutesStr[0]}</span>
      <span>{minutesStr[1]}</span>
      <CountdownSeparator>:</CountdownSeparator>
      <span>{secondsStr[0]}</span>
      <span>{secondsStr[1]}</span>
    </CountdownContainer>
  )
}
