import React, { useMemo, useState } from 'react';

interface WizardFlowProps<Step extends keyof any> {
  initialStep: Step;
  onClose?: () => void;
  steps: Record<Step, JSX.Element>;
}

interface WizardFlowContext<Step extends keyof any> {
  transition: (step: Step) => void;
  close: () => void;
}

interface WizardFlow<Step extends keyof any> {
  Context: React.Context<WizardFlowContext<Step>>;
  Provider: (props: WizardFlowProps<Step>) => JSX.Element;
}

const DEFAULT_WIZARD_FLOW_CONTEXT = {
  transition: () => {
    // Set the step context value to the desired step
  },
  close: () => {
    // Place for the callback once the wizard is done
  },
};

export function createWizardFlow<Steps extends Record<string, keyof any>>(
  _: Steps,
) {
  type Step = Steps[keyof Steps];

  const Context = React.createContext<WizardFlowContext<Step>>(
    DEFAULT_WIZARD_FLOW_CONTEXT,
  );

  function Provider({ initialStep, onClose, steps }: WizardFlowProps<Step>) {
    /* hold context of what the current step is */
    /* set context value for interacting with the flow state */
    /* render provider and current step */
    const [step, setStep] = useState<Step>(initialStep);
    const node = useMemo(() => steps[step], [steps, step]);
    const contextValue = useMemo(
      () => ({
        transition: (step: Step): void => setStep(step),
        close: (): void => {
          onClose && onClose();
        },
      }),
      [onClose],
    );
    return <Context.Provider value={contextValue}>{node}</Context.Provider>;
  }

  return { Provider, Context };
}

export function useWizardFlow<Step extends keyof any>(
  WizardFlow: WizardFlow<Step>,
) {
  return React.useContext(WizardFlow.Context);
}
