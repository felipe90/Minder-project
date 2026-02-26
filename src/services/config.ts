export const IMDB_CONFIG = {
  BASE_URL: 'https://api.imdbapi.dev',
};

export const SORT_OPTIONS = [
  { id: 'SORT_BY_POPULARITY', name: 'Popularity (Desc)' },
  { id: 'SORT_BY_RELEASE_DATE', name: 'Release Date (Newest)' },
  { id: 'SORT_BY_USER_RATING', name: 'User Rating' },
  { id: 'SORT_BY_USER_RATING_COUNT', name: 'Vote Count' },
  { id: 'SORT_BY_YEAR', name: 'Year (Newest)' },
];

export const TITLE_TYPES = {
  MOVIE: 'MOVIE',
  TV_SERIES: 'TV_SERIES',
  TV_MINI_SERIES: 'TV_MINI_SERIES',
};

export const YEARS = Array.from({ length: 127 }, (_, i) => 2024 - i);
