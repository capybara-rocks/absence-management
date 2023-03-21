import { render } from '@testing-library/react';

import LeaveDetails from './LeaveDetails';

describe('LeaveDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LeaveDetails />);
    expect(baseElement).toBeTruthy();
  });
});
