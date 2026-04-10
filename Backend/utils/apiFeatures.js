class APIFeatures {
  constructor(query, queryString) {
    this.query = query; // mongoose query
    this.queryString = queryString; // req.query
  }

  // 🔍 SEARCH (by name)
  search() {
    if (this.queryString.keyword) {
      const keyword = this.queryString.keyword;

      this.query = this.query.find({
        name: {
          $regex: keyword,
          $options: "i", // case-insensitive
        },
      });
    }
    return this;
  }

  // 🎯 FILTER (status, age, etc.)
  filter() {
    const queryCopy = { ...this.queryString };

    // remove fields not needed
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    this.query = this.query.find(queryCopy);

    return this;
  }

  // 📄 PAGINATION
  pagination(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

export default APIFeatures;