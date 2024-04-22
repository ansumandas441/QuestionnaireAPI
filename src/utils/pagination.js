const paginate = (array, paginationStart, paginationLimit)=>{
    paginationStart = parseInt(paginationStart);
    paginationLimit = parseInt(paginationLimit);
    const endIndex = Math.min(paginationStart + paginationLimit, array.length);
    const paginatedArray = array.slice(paginationStart, endIndex);
    return paginatedArray;
}

module.exports = paginate;