export interface IContent {
  slug: string;
  date: string;
  title: string;
  category: string;
  featuredImage: {
    publicURL: string;
    name: string;
  };
}
