// response error message to user
exports.rerror = (res, message) => {
    res.json({
        result: 0,
        message: message
    });
};

// response unexpected error message to user
exports.ruerror = (res, err) => {
    console.log(err);
    this.responseError(res, 'Unexpected Error');
};