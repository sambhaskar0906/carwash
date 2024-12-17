exports.errors = {
    internalErr: (e, msg = "") => {
        return ({
            success: false,
            message: "Internal server error " + msg + " " + e,
            data: null
        })
    },
    unknownErr: (e, msg = "") => {
        return ({
            success: false,
            message: "Something went wrong " + msg + " " + e,
            data: null
        })
    },
}

exports.response = {
    success: (res, msg = "") => {
        return (
            {
                success: true,
                message: msg,
                data: res,
            }
        )
    },
    failure: (res, msg = "") => {
        return (
            {
                success: false,
                message: msg,
                data: res,
            }
        )
    }
}