import { render, screen } from '@testing-library/react';
import InterviewTable from './InterviewTable';

describe('InterviewTable', () => {
  it('renders Interviews title and Add Interview button', () => {
    render(<InterviewTable />);
    expect(screen.getByText('Interviews')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add interview/i })).toBeInTheDocument();
  });
}); 