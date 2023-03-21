import { render } from '@testing-library/react';

import AuthMenu from './AuthMenu';

describe('AuthMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthMenu />);
    expect(baseElement).toBeTruthy();
  });
});
