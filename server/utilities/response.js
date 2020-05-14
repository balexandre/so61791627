// RESPONSES FILE
// ============================================================
exports.paging = (sequelizeResult, page, limit) => ({
  page,
  limit,
  total: sequelizeResult.count,
  data: sequelizeResult.rows,
});
