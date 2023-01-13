const formatter = new Intl.DateTimeFormat("en", {
    year: "2-digit",
    month: "long",
})

const formatKey = date => formatter.format(date).replace(" ", "-")

export {
    formatKey
}