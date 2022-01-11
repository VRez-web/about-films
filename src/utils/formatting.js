export function formattingDate(date) {
    const days = date.slice(8, 10),
        month = date.slice(5, 7),
        year = date.slice(0, 4)

    return `${days}/${month}/${year}`
}
