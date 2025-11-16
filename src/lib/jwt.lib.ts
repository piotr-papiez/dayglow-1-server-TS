import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

interface TokenPayloadType extends JwtPayload {
    userId: string;
}

const ACCESS_TTL = "15m";
const REFRESH_TTL = "30d";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export function signAccessToken(payload: { userId: string }): string {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_TTL });
}

export function signRefreshToken(payload: { userId: string }): string {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_TTL });
}

export function decodeAccessToken(token?: string): string | undefined {
    if (!token) return undefined;

    try {
        const { userId } = jwt.verify(token, ACCESS_SECRET) as TokenPayloadType;
        
        return userId;
    } catch (error) {
        return undefined;
    }
}

export function decodeRefreshToken(token?: string): string | undefined {
    if (!token) return undefined;

    try {
        const { userId } = jwt.verify(token, REFRESH_SECRET) as TokenPayloadType;

        return userId;
    } catch (error) {
        return undefined;
    }
}