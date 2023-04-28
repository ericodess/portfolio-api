import { sign, verify } from "jsonwebtoken";

// Types
import { InHouseError, Statics } from "@types";

export class JWTService {
    public static onSignIn(userName: string): string {
        if (!process.env.SECRET || !process.env.COOKIE_NAME) {
            return null;
        }

        return sign({ userName }, process.env.SECRET, {
            expiresIn: JWTService.getExpirationTimeInMs(),
        });
    }

    public static onVerification(accessToken: string): string {
        if (!process.env.SECRET || !process.env.COOKIE_NAME) {
            throw new InHouseError(
                "Invalid cookie settings, pelace contact the adminstrator",
                503
            );
        }

        if (!accessToken) {
            throw new InHouseError("No access token provided", 403);
        }

        const result = verify(accessToken, process.env.SECRET);

        if (typeof result !== "string") {
            return result.userName;
        }

        return result;
    }

    public static getExpirationTimeInMs() {
        return (
            (parseInt(process.env.COOKIE_EXPIRATION_TIME_IN_DAYS) ??
                Statics.DEFAULT_COOKIE_EXPIRATION_TIME_IN_DAYS) *
            24 *
            60 *
            60 *
            1000
        );
    }

    public static getExpirationTimeInDate() {
        return new Date(Date.now() + JWTService.getExpirationTimeInMs());
    }
}
