export interface IBook {
  id?: string;
  title: string;
  author: string;
  readIn: string;
  review: string;
  currentlyReading?: string;
  publicationDate?: string;
  finishedDate?: string;
  comment?: string;
  slug?: string;
  createdAt: Date;
  image: {
    url: string;
    alt: string;
  };
}
