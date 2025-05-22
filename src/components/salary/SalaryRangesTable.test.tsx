import { render, screen } from '@testing-library/react';
jest.mock('@/utils/supabaseClient', () => ({
  supabase: {
    from: () => ({
      select: () => ({ data: [], error: null }),
    }),
  },
}));
import SalaryRangesTable from './SalaryRangesTable';

describe('SalaryRangesTable', () => {
  it('renders filter controls and analytics section', () => {
    render(<SalaryRangesTable />);
    expect(screen.getByLabelText(/department/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/job title/i)).toBeInTheDocument();
    expect(screen.getByText(/analytics/i)).toBeInTheDocument();
  });
}); 