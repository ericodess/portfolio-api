export class RequestService {
    public static isValidQueryParam(value: any) {
        return value != null && typeof value == "string";
    }
}
