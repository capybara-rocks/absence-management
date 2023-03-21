import { render } from '@testing-library/react';

import TextAreaFormField from './TextAreaFormField';

describe('TextAreaFormField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextAreaFormField />);
    expect(baseElement).toBeTruthy();
  });
});
