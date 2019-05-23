export default class Response {
    constructor(code, response) {
        this.Code = code;
        this.Headers = {
            'content-type': 'application/json'
        };
        if (code >= 200 && code <= 400) {
            if (typeof response !== 'string') {
                response = JSON.stringify(response);
            }
            this.Body = response;
        } else {
            this.message = 'internal service error';
        }
    }
}
