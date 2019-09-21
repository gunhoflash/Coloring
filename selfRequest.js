const SELF_REQUEST_JOSN = {	result: 1 };
let intervalCount;
let intervalObj;

exports.init = (url, app) => {

    // /selfRequest
    app.get('/selfRequest', (req, res) => {
        console.log('/selfRequest');
        res.json(SELF_REQUEST_JOSN);
    });

    // /start
    app.get('/selfRequestStart', (req, res) => {
        console.log('/selfRequestStart');
        intervalCount = 0;
        intervalObj = setInterval(() => {
            intervalCount++;
            console.log(`Interval ${intervalCount}/180`);
            if (intervalCount == 180)
                clearInterval(intervalObj);
            else
                request(`${url}selfRequest`,  (error, response, body) => {});
        }, 60000);
        res.json(SELF_REQUEST_JOSN);
    });

    // /end
    app.get('/selfRequestEnd', (req, res) => {
        console.log('/selfRequestEnd');
        clearInterval(intervalObj);
        res.json(SELF_REQUEST_JOSN);
    });

};