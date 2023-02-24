import { fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { createWizardFlow, useWizardFlow } from 'index';

enum TestSteps {
  step1,
  step2,
  step3,
  step4,
}

const TestWizardFlow = createWizardFlow(TestSteps);

function Step({ header }: { header: string }) {
  const { transition, close } = useWizardFlow(TestWizardFlow);
  return (
    <div>
      <header>{header}</header>
      <button onClick={() => transition(TestSteps.step1)}>To Step 1</button>
      <button onClick={() => transition(TestSteps.step2)}>To Step 2</button>
      <button onClick={() => transition(TestSteps.step3)}>To Step 3</button>
      <button onClick={() => transition(TestSteps.step4)}>To Step 4</button>
      <button onClick={close}>Close</button>
    </div>
  );
}

const STEPS = {
  [TestSteps.step1]: <Step header="Step 1" />,
  [TestSteps.step2]: <Step header="Step 2" />,
  [TestSteps.step3]: <Step header="Step 3" />,
  [TestSteps.step4]: <Step header="Step 4" />,
};

describe('#react-wizard-flow', () => {
  it('should render a-ok', async () => {
    const { container, getByText } = render(
      <TestWizardFlow.Provider initialStep={TestSteps.step1} steps={STEPS} />,
    );
    expect(getByText('Step 1')).toBeVisible();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have functioning transitions', async () => {
    const { container, getByText } = render(
      <TestWizardFlow.Provider initialStep={TestSteps.step1} steps={STEPS} />,
    );
    expect(getByText('Step 1')).toBeVisible();
    fireEvent.click(getByText('To Step 2'));
    expect(getByText('Step 2')).toBeVisible();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have a functioning close callback', async () => {
    const handleClose = jest.fn();
    const { container, getByText } = render(
      <TestWizardFlow.Provider
        initialStep={TestSteps.step1}
        steps={STEPS}
        onClose={handleClose}
      />,
    );
    expect(getByText('Step 1')).toBeVisible();
    expect(handleClose.mock.calls).toHaveLength(0);
    fireEvent.click(getByText('Close'));
    expect(getByText('Step 1')).toBeVisible();
    expect(handleClose.mock.calls).toHaveLength(1);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not blow up without a close callback', () => {
    expect(async () => {
      const { container, getByText } = render(
        <TestWizardFlow.Provider initialStep={TestSteps.step1} steps={STEPS} />,
      );
      expect(getByText('Step 1')).toBeVisible();
      fireEvent.click(getByText('Close'));
      expect(getByText('Step 1')).toBeVisible();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }).not.toThrow();
  });
});
