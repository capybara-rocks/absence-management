import { render } from '@testing-library/react';

import DataGridItem from './DataGridItem';

describe('DataGridItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DataGridItem />);
    expect(baseElement).toBeTruthy();
  });
});
