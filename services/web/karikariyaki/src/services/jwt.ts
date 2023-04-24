import { sign, verify, VerifyErrors } from "jsonwebtoken";

// Types
import { InHouseResponse } from "@types";

export class JWTService {
    public static onSignUp(userName: string): string {
        if (!process.env.SECRET) {
            return "SECRECTNOTFOUND";
        }

        return sign({ userName }, process.env.SECRET, {
            expiresIn: 600,
        });
    }

    public static onSignIn(
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
                description: "No access_token provided",
            };
        }

        verify(accessToken, process.env.SECRET, callback);
    }
}
