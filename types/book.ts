export interface IBook {
  title: string;
  author: string;
  readIn: string;
  rating: number;
  currentlyReading?: boolean;
  publicationDate?: string;
  comment?: string;
  created_at: Date;
}
