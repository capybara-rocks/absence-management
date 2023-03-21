import { render } from '@testing-library/react';

import EditLeave from './EditLeave';

describe('EditLeave', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditLeave />);
    expect(baseElement).toBeTruthy();
  });
});
