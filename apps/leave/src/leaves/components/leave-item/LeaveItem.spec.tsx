import { render } from '@testing-library/react';

import LeaveItem from './LeaveItem';

describe('LeaveItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LeaveItem />);
    expect(baseElement).toBeTruthy();
  });
});
