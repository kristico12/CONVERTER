function getQuery(query) {
    const queryArray = query.split('?')[1].split('&');
    const queryParams = {};
    for (let i = 0; i < queryArray.length; i += 1) {
        const [key, val] = queryArray[i].split('=');
        queryParams[key] = val || true;
    }
    return queryParams;
}
export default getQuery;
