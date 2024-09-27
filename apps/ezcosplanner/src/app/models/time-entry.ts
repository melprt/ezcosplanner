export interface TimeEntry {
    id: number;
    day: Date;
    time: number;
    part: {
      id: number;
      name: string;
    } | null;
    task: {
      id: number;
      name: string;
      part: {
        id: number;
        name: string;
      };
    } | null
}

export interface TimeEntryApiResult {
  timeEntries: TimeEntry[],
  count: number,
  sum: number
}

export interface TimeEntryFilters {
  startDate : Date|null,
  endDate : Date|null,
  element : string|null,
  task : string|null,
}