class APIfeatures {
    constructor(query, queryStr) {
        this.query = query,
            this.queryStr = queryStr
    }
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}
        this.query = this.query.find({ ...keyword })
        return this
    }
    pagination() {
        const page = this.queryStr.page * 1 || 1
        const limit = this.queryStr.limit * 1 || 20
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }

}

module.exports = APIfeatures