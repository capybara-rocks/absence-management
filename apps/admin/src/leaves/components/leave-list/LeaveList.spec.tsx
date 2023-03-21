import { render } from '@testing-library/react';

import LeaveList from './LeaveList';

describe('LeaveList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LeaveList />);
    expect(baseElement).toBeTruthy();
  });
});
