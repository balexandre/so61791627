// RESPONSES FILE
// ============================================================
exports.paging = (sequelizeResult, page, limit) => ({
    page: page,
    limit: limit,
    total: sequelizeResult.count,
    data: sequelizeResult.rows,
})
