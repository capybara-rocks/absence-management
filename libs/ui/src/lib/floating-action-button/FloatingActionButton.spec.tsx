import { render } from '@testing-library/react';

import FloatingActionButton from './FloatingActionButton';

describe('FloatingActionButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FloatingActionButton />);
    expect(baseElement).toBeTruthy();
  });
});
