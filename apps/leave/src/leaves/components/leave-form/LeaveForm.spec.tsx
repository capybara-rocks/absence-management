import { render } from '@testing-library/react';

import LeaveForm from './LeaveForm';

describe('LeaveForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LeaveForm />);
    expect(baseElement).toBeTruthy();
  });
});
