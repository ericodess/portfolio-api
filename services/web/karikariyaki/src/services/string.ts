import { Types } from "mongoose";

export class StringService {
    public static isStringInsideBoundaries(
        value: string,
        minSize: number,
        maxSize: number
    ) {
        if (!value) {
            return false;
        }

        const trimmedValue = value.trim();

        return trimmedValue.length > minSize && trimmedValue.length < maxSize;
    }

    public static toCamelCase(value: string) {
        const map = {
            a: "á|à|ã|â|À|Á|Ã|Â",
            e: "é|è|ê|É|È|Ê",
            i: "í|ì|î|Í|Ì|Î",
            o: "ó|ò|ô|õ|Ó|Ò|Ô|Õ",
            u: "ú|ù|û|ü|Ú|Ù|Û|Ü",
            c: "ç|Ç",
            n: "ñ|Ñ",
        };

        for (const pattern in map) {
            value = value.replace(new RegExp(pattern, "g"), pattern);
        }

        return value
            .replace(/([-_][a-z]|[A-Z]|)/g, (word, index) => {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            })
            .replace(/[^a-zA-Z]/g, "");
    }

    public static toObjectId(value: string) {
        if (!value) {
            return null;
        }

        return new Types.ObjectId(value);
    }

    public static toObjectIds(values: string[]) {
        if (!values) {
            return null;
        }

        const convertedValues: Types.ObjectId[] = [];

        values.forEach((currentValue) => {
            convertedValues.push(new Types.ObjectId(currentValue));
        });

        return convertedValues;
    }
}
