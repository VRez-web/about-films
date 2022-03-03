export const correctRouteName = (mediaType) => {
    if (mediaType === "movie") return "movie-id"
    else if (mediaType === 'tv') return "serial-id"
    return 'person-id'
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
        "no-rating": item === 0,
    };
};

export const checkPoster = (poster, size = '342') => {
    let imgUrl = `https://image.tmdb.org/t/p/w${size}`;

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

export const correctDate = (item) => {
    if (item.first_air_date) return item.first_air_date

    return item.release_date
}

export const getYear = (date) => {
    const currentYear = new Date().getFullYear() + 1
    return date ? date.slice(0, 4) : currentYear
}
