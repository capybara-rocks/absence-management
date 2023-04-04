import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import LeaveItem from './LeaveItem';
import { Leave, Status } from '../../types';

describe('LeaveItem', () => {
  const leave: Leave = {
    id: 1,
    leaveDate: '2023-04-03T14:32:13.977Z',
    reason: 'Lorem',
    status: Status.Pending,
    user: {
      name: 'Admin',
      email: 'admin@babelcoder.com',
      role: 0,
    },
  };

  it('renders data correctly', () => {
    render(
      <MemoryRouter>
        <LeaveItem {...leave} />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', {
        name: /Monday, April 3, 2023/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(leave.reason)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `/leaves/${leave.id}/edit`
    );
  });
});
