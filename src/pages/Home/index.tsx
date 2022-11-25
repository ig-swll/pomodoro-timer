import { Play } from 'phosphor-react';
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
  TaskInput,
} from './styles';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Specify a task'),
  minutesAmount: zod.number().min(5).max(60),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const isSubmitDisabled = !watch('task');

  function handleNewCycleCreation(data: any) {
    console.log(data);
    reset();
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
          <span>0</span>
          <span>0</span>
          <CountdownSeparator>:</CountdownSeparator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
