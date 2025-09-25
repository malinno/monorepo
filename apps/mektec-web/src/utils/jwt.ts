interface JwtPayload {
  sub: string; // user id
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export class JwtService {
  private static parseJwt(token: string): JwtPayload | null {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error parsing JWT:", error);
      return null;
    }
  }

  static isTokenExpired(token: string): boolean {
    const payload = this.parseJwt(token);
    if (!payload) return true;

    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  }

  static getTokenExpirationTime(token: string): number | null {
    const payload = this.parseJwt(token);
    return payload ? payload.exp * 1000 : null;
  }

  static getTimeUntilExpiry(token: string): number | null {
    const expTime = this.getTokenExpirationTime(token);
    if (!expTime) return null;

    return expTime - Date.now();
  }

  static shouldRefreshToken(
    token: string,
    threshold: number = 5 * 60 * 1000
  ): boolean {
    const timeUntilExpiry = this.getTimeUntilExpiry(token);
    if (!timeUntilExpiry) return true;

    return timeUntilExpiry <= threshold;
  }

  static getTokenPayload(token: string): JwtPayload | null {
    return this.parseJwt(token);
  }
}
