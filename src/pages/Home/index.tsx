import { HandPalm, Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';

import {
  CountdownContainer,
  CountdownSeparator,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from './styles';
import { useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Specify a task'),
  minutesAmount: zod.number().min(1).max(60),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const isSubmitDisabled = !watch('task');
  const activeCycle = cycles.find(({ id }) => id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const totalRemainingSeconds = activeCycle ? totalSeconds - elapsedTime : 0;

  const remainingMinutes = String(
    Math.floor(totalRemainingSeconds / 60),
  ).padStart(2, '0');
  const remainingSeconds = String(totalRemainingSeconds % 60).padStart(2, '0');

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        setElapsedTime(differenceInSeconds(new Date(), activeCycle.startDate));
      }, 1000);
    }
    return () => {
      setElapsedTime(0);
      clearInterval(interval);
    };
  }, [activeCycle]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${remainingMinutes}:${remainingSeconds}`;
    }
  }, [remainingMinutes, remainingSeconds, activeCycle]);

  function handleNewCycleCreation(data: NewCycleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);

    reset();
  }

  function handleCycleInterruprion() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        }
        return cycle;
      }),
    );

    setActiveCycleId(null);
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleNewCycleCreation)}>
        <FormContainer>
          <label htmlFor="task">I'm working in</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="give your project a name"
            list="task-suggestions"
            disabled={!!activeCycle}
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Project 1" />
            <option value="Project 2" />
            <option value="Project 3" />
            <option value="Project 4" />
            <option value="Project 5" />
          </datalist>

          <label htmlFor="minutesAmout">for</label>
          <MinutesAmountInput
            disabled={!!activeCycle}
            type="number"
            min={0}
            max={60}
            id="minutesAmount"
            placeholder="00"
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{remainingMinutes[0]}</span>
          <span>{remainingMinutes[1]}</span>
          <CountdownSeparator>:</CountdownSeparator>
          <span>{remainingSeconds[0]}</span>
          <span>{remainingSeconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleCycleInterruprion}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
