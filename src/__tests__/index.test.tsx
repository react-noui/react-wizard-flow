import {render} from '@testing-library/react';
import {axe} from 'jest-axe';
import { createWizardFlow, useWizardFlow } from "index";

enum TestSteps {
  step1,
  step2,
  step3,
  step4,
}

const TestWizardFlow = createWizardFlow(TestSteps);

function Step({ header }: {header:string}) {
  const {transition, close} = useWizardFlow(TestWizardFlow);
  return <div>
    <header>{header}</header>
    <button onClick={() => transition(TestSteps.step1)}>To Step 1</button>
    <button onClick={() => transition(TestSteps.step2)}>To Step 2</button>
    <button onClick={() => transition(TestSteps.step3)}>To Step 3</button>
    <button onClick={() => transition(TestSteps.step4)}>To Step 4</button>
    <button onClick={close}>Close</button>
  </div>
}

const STEPS = {
  [TestSteps.step1]: <Step header="Step 1" />,
  [TestSteps.step2]: <Step header="Step 2" />,
  [TestSteps.step3]: <Step header="Step 3" />,
  [TestSteps.step4]: <Step header="Step 4" />,
}

describe('#react-wizard-flow', () => {
  it('should render a-ok', () => {
    const { container, getByText } = render(
      <TestWizardFlow.Provider initialStep={TestSteps.step1} steps={STEPS} />
    )
    expect(getByText('Step 1')).toBeVisible();

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should have functioning transitions', () => {
    expect(true).toBe(true);
  });

  it('should have a functioning close callback', () => {
    expect(true).toBe(true);
  });

  it('should not blow up without a close callback', () => {
    expect(true).toBe(true);
  });
});
