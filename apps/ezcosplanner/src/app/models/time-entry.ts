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