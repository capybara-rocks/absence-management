import { render } from '@testing-library/react';

import ProtectedResource from './ProtectedResource';

describe('ProtectedResource', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProtectedResource />);
    expect(baseElement).toBeTruthy();
  });
});
