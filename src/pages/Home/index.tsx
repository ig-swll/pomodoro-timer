import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";

import {
  CountdownContainer,
  CountdownSeparator,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  StartCountdownButton,
  TaskInput,
} from "./styles";

export function Home() {
  const { register, handleSubmit, watch } = useForm();

  const isSubmitDisabled = !watch("task");

  function handleCycleCreation(data: any) {
    console.log("formSubmit");
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCycleCreation)}>
        <FormContainer>
          <label htmlFor="task">I'm working in</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="give your project a name"
            list="task-suggestions"
            {...register("task")}
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
            {...register("minutesAmount", { valueAsNumber: true })}
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
