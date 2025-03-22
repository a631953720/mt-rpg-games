export interface Entity<ID = number> {
  id: ID | null;

  isNew(): boolean;
}
