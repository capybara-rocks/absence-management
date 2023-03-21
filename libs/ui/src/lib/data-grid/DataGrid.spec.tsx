import { render } from '@testing-library/react';

import DataGrid from './DataGrid';

describe('DataGrid', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DataGrid />);
    expect(baseElement).toBeTruthy();
  });
});
