var ObjectId = require('mongoose').Types.ObjectId;

// each method should return this to be able to be chained
module.exports = class Validate {
    constructor(data) {
        this.data = data
        this.isValid = true
    }

    /**
     * check is input is string
     */
    isString() {
        if (typeof this.data === 'string'
            || this.data instanceof String) {
            return this
        }

        this.isValid = false
        return this
    }

    /**
     * check is input is number
     */
    isNumber() {
        if (typeof this.data === 'number'
            && Number.isFinite(this.data)
            && !(this.data % 1)) {
            return this
        }

        this.isValid = false
        return this
    }

    /**
     * check is input is certain length
     * accept {min: 0, max: 0} as an argument
     */
    isLength(options) {
        if (this.data.length >= (options.min || 0)
            && (typeof options.max === 'undefined'
            || this.data.length <= options.max)) {
            return this
        }

        this.isValid = false
        return this
    }

    /**
     * check is input is not empty
     */
    isNotEmpty() {
        if (this.data.length !== 0) {
            return this
        }

        this.isValid = false
        return this
    }

    /**
     * check is input in correct date format
     */
    isDate() {
        if (this.data instanceof Date && !isNaN(date.valueOf())) {
            return this
        }

        this.isValid = false
        return this
    }

    /**
     * check is input is valid mongo id
     */
    isMongoID() {
        if (ObjectId.isValid(this.data)) {
            return this
        }

        this.isValid = false
        return this
    }
}
