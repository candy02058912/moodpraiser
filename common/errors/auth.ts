enum AuthErrorCode {
  UNKNOWN,
  MISMATCHED_PROVIDER,
}

export const MISMATCHED_PROVIDER = {
  code: AuthErrorCode.MISMATCHED_PROVIDER,
  message: "Email already used by another provider.",
};

export class AuthError extends Error {
  code: AuthErrorCode;
  constructor(message: string, code = AuthErrorCode.UNKNOWN) {
    super(message);
    this.name = "AuthError";
    this.code = code;
  }
}
