export const correctRouteName = (mediaType) => {
    if (mediaType === "movie") return "movie-id";
    return "serial-id";
};

export const checkMediaType = (creation) => {
    if (creation.title) return 'movie'
    return 'serial'
}

export const checkVote = (item) => {
    return {
        "high-rating": item >= 7,
        "mid-rating": item < 7 && item >= 4,
        "low-rating": item >= 1 && item < 4,
        "no-rating": item === "NR",
    };
};

export const checkPoster = (poster) => {
    let imgUrl = "https://image.tmdb.org/t/p/w342";

    if (poster) return imgUrl + poster;

    return require("@/assets/img/no-poster.jpg");
};

export const checkProfileImg = (poster, size = '185') => {
    let imgUrl = `https://image.tmdb.org/t/p/w${size}`;

    if (poster) return imgUrl + poster;

    return require('@/assets/img/no-avatar-person.jpg');
};

export const correctTitle = (item) => {
    if (item.title) return item.title;

    return item.name;
};

export const getYear = (date) => {
    return date.slice(0, 4)
}
