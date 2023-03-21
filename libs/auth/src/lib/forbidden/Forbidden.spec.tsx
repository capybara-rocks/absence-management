import { render } from '@testing-library/react';

import Forbidden from './Forbidden';

describe('Forbidden', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Forbidden />);
    expect(baseElement).toBeTruthy();
  });
});
