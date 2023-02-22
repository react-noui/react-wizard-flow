import React from 'react';

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
  transition: () => {}, //eslint-disable-line @typescript-eslint/no-empty-function
  close: () => {}, //eslint-disable-line @typescript-eslint/no-empty-function
};

export function createWizardFlow<Steps extends Record<string, keyof any>>(
  _: Steps,
) {
  type Step = Steps[keyof Steps];

  const Context = React.createContext<WizardFlowContext<Step>>(
    DEFAULT_WIZARD_FLOW_CONTEXT,
  );

  const Provider = () => {
    /* hold context of what the current step is */
    /* set context value for interacting with the flow state */
    /* render provider and current step */
  };

  return { Provider, Context };
}

export function useWizardFlow<Step extends keyof any>(
  wizardFlow: WizardFlow<Step>,
) {
  return React.useContext(wizardFlow.Context);
}
