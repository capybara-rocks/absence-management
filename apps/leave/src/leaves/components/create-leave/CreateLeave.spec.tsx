import { render } from '@testing-library/react';

import CreateLeave from './CreateLeave';

describe('CreateLeave', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateLeave />);
    expect(baseElement).toBeTruthy();
  });
});
