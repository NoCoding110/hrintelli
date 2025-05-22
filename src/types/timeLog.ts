export interface TimeLog {
  id: number;
  user_id: string;
  date: string;
  check_in_time: string;
  check_out_time: string;
  break_duration_minutes: number;
  total_hours: number;
  status: string;
} 