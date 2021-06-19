export interface DBUser {
  uid: string;
  name?: string;
  email?: string;
  last_login_time?: number;
  provider?: string;
}

export interface Habit {
  name: string;
}
