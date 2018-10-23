export interface TimeRepository {
  getTime(): Promise<string>;
}