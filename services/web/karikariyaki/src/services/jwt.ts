import { sign, verify, VerifyErrors } from "jsonwebtoken";

// Types
import { InHouseResponse, Statics } from "@types";

export class JWTService {
    public static onSignIn(userName: string): string {
        if (!process.env.SECRET) {
            return "SECRECTNOTFOUND";
        }

        return sign({ userName }, process.env.SECRET, {
            expiresIn: JWTService.getExpirationTimeInMs(),
        });
    }

    public static onRefresh(
        accessToken: string,
        callback: (err: VerifyErrors | null, decoded: any) => void
    ): InHouseResponse {
        if (!process.env.SECRET) {
            return {
                code: 503,
                wasSuccessful: false,
                description: "No secret provided",
            };
        }

        if (!accessToken) {
            return {
                code: 403,
                wasSuccessful: false,
                description: "No access token provided",
            };
        }

        verify(accessToken, process.env.SECRET, callback);
    }

    public static getExpirationTimeInMs() {
        return (
            parseInt(process.env.COOKIE_EXPIRATION_TIME_IN_MS) ??
            Statics.DEFAULT_COOKIE_EXPIRATION_TIME_IN_MS
        );
    }
}
