const limit = process.env.LIMIT
const pagination = (count, page) => {
    const allPage = Math.ceil(count / limit);
    const nextPage = Number(page) + 1;
    const prevPage = Number(page) - 1;
    const pagination = {
        allPage: allPage,
    };
    if (nextPage <= allPage) {
        pagination.nextPage = nextPage;
    }
    if (prevPage > 0) {
        pagination.prevPage = prevPage;
    }
    return pagination
}
module.exports = pagination