import { render, screen } from '@testing-library/react';
jest.mock('@/utils/supabaseClient', () => ({
  supabase: {
    from: () => ({
      select: () => ({ order: () => ({ data: [], error: null }) }),
      insert: () => ({}),
    }),
  },
}));
import TimeTrackingTable from './TimeTrackingTable';

describe('TimeTrackingTable', () => {
  it('renders Time Tracking title and Add Log button', () => {
    render(<TimeTrackingTable />);
    expect(screen.getByText('Time Tracking')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add log/i })).toBeInTheDocument();
  });
}); 