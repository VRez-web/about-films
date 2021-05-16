export const correctRouteName = (category) => {
  if (category == "movie") return "card-details-movie";
  return "card-details-serial";
};

export const checkVote = (item) => {
  return {
    "high-rating": item.vote_average >= 7,
    "mid-rating": item.vote_average < 7 && item.vote_average >= 4,
    "low-rating": item.vote_average >= 1 && item.vote_average < 4,
    "no-rating": item.vote_average == "NR",
  };
};

export const checkPoster = (poster) => {
  let imgUrl = "https://image.tmdb.org/t/p/w342";

  if (poster) {
    return imgUrl + poster;
  }

  return require("@/assets/img/no-poster.jpg");
};
