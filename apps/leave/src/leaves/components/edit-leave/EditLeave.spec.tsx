import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import EditLeave from './EditLeave';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const server = setupServer();

describe('EditLeave', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('renders form correctly', async () => {
    const leave = {
      id: 2,
      status: 1,
      reason: 'gg',
      leaveDate: '2023-04-11T00:00:00.000Z',
    };
    server.use(
      rest.get(
        `http://localhost:3333/v1/leaves/${leave.id}`,
        (req, res, ctx) => {
          return res(ctx.json(leave));
        }
      ),
      rest.get('http://localhost:3333/v1/leaves', (req, res, ctx) => {
        return res(ctx.status(200));
      })
    );

    render(
      <MemoryRouter initialEntries={[`/leaves/${leave.id}/edit`]}>
        <Routes>
          <Route path="/leaves/:id/edit" element={<EditLeave />}></Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      screen.getByRole('heading', {
        name: /edit/i,
      })
    );

    const reasonTextbox = screen.getByRole('textbox', {
      name: /reason/i,
    });
    const editButton = screen.getByRole('button', {
      name: /edit/i,
    });
    expect(reasonTextbox).toHaveValue(leave.reason);

    await userEvent.type(reasonTextbox, 'New Reason');
    await userEvent.click(editButton);
  });
});
