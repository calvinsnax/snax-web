export interface IContent {
  slug: string;
  date: string;
  title: string;
  category: string;
  categoryTextColor: string;
  categoryBackgroundColor: string;
  featuredImage: {
    publicURL: string;
    name: string;
  };
}
