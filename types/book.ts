export interface IBook {
  title: string;
  author: string;
  readIn: string;
  review: string;
  currentlyReading?: boolean;
  publicationDate?: string;
  comment?: string;
  created_at: Date;
  image: {
    url: string;
    alt: string;
  };
}
