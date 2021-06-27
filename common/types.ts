export interface DBUser {
  uid: string;
  name?: string;
  email?: string;
  last_login_time?: number;
  provider?: string;
}

export interface Habit {
  id: string;
  name: string;
  records: Record[];
  completed: number;
  praised: number;
}

export enum Mood {
  UNKNOWN,
  GREAT,
  GOOD,
  FINE,
  MEH,
  BAD,
}
export interface Record {
  mood?: Mood;
  uid?: string;
  habit_id: string;
}
