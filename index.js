import QRCode from 'qrcode';

const generateCode = (prefix, eventName, canvas) => {

    const readCookie = (key) => {
        const cookies = window.document.cookie || '';
        return ((`; ${cookies};`).match(`; ${key}=([^¥S;]*)`) || [])[1];
    };

    const
        parser = new URL(window.location.href),
        now = +new Date,
        clientId = readCookie(`${prefix}`) || 'not_available',
        sscId = readCookie(`${prefix}_ssc_id`) || 'not_available';

    const destination = `${parser.origin}/for_organizers/?generatedAt=${now}&clientId=${encodeURIComponent(clientId)}&sscId=${encodeURIComponent(sscId)}&evName=${encodeURIComponent(eventName)}`;

    QRCode.toCanvas(canvas, destination, (err) => {
        console.log(err);
    });

    return {
        generatedAt: now,
        clientId: clientId,
        sscId: sscId
    };
};

const parseUrl = (url) => {
    let query, result = {}, parser = document.createElement('a');
    if (url) {
        parser.href = url;
        query = parser.search.slice(1).split('&').reduce((obj, val) => {
            let pair = val.split('=');
            obj[pair[0]] = pair[1];
            return obj;
        }, {});
        result = {
            Protocol: parser.protocol,
            Host: parser.hostname,
            Port: parser.port,
            Path: parser.pathname,
            Search: parser.search,
            Hash: parser.hash,
            Query: query
        }
    }
    return result;
};

window['generateCode'] = generateCode;
window['parseUrl'] = parseUrl;