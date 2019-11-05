// response error message to user
exports.rerror = (res, message) => {
    console.log(message);
    res.json({
        result: 0,
        message: message
    });
};

// response unexpected error message to user
exports.ruerror = (res, err) => {
    console.log(err);
    this.rerror(res, 'Unexpected Error');
};