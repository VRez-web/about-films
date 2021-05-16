export const correctRouteName = (category) => {
  if (category == "movie") return "card-details-movie";
  return "card-details-serial";
};

export const checkVote = (item) => {
  return {
    "high-rating": item >= 7,
    "mid-rating": item < 7 && item >= 4,
    "low-rating": item >= 1 && item < 4,
    "no-rating": item == "NR",
  };
};

export const checkPoster = (poster) => {
  let imgUrl = "https://image.tmdb.org/t/p/w342";

  if (poster) return imgUrl + poster;

  return require("@/assets/img/no-poster.jpg");
};

export const correctTitle = (item) => {
  if (item.title) return item.title;

  return item.name;
};
