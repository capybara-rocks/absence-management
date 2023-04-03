import { render } from '@testing-library/react';

import LeaveLayout from './LeaveLayout';

describe('LeaveLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LeaveLayout />);
    expect(baseElement).toBeTruthy();
  });
});
