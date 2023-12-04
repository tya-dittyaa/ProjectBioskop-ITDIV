export interface Film {
  id: string;
  title: string;
  genre: string;
  rating: number;
  description: string;
  image_link: string;
  release_date: Date;
}

export interface Schedule {
  id: string;
  filmId: string;
  studioId: string;
  showTime: Date;
}
