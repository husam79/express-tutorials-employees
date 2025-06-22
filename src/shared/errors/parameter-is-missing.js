export default class ParameterIsMissingError extends Error {
    constructor(message){
        super();
        this.message = message;
        this.http_code = 400;
    }
}