export class InHouseError extends Error {
    public code: number;

    constructor(message: string, code: number) {
        super(message);

        this.name = "InHouseError";
        this.code = code;
    }
}
