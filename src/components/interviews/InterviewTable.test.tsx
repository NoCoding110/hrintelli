import { render, screen } from '@testing-library/react';
jest.mock('@/utils/supabaseClient', () => ({
  supabase: {
    from: () => ({
      select: () => ({ order: () => ({ data: [], error: null }) }),
      delete: () => ({}),
      update: () => ({}),
      insert: () => ({}),
    }),
  },
}));
import InterviewTable from './InterviewTable';

describe('InterviewTable', () => {
  it('renders Interviews title and Add Interview button', () => {
    render(<InterviewTable />);
    expect(screen.getByText('Interviews')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add interview/i })).toBeInTheDocument();
  });
}); 