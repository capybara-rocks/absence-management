import { render } from '@testing-library/react';

import FormField from './FormField';

describe('FormField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormField />);
    expect(baseElement).toBeTruthy();
  });
});
