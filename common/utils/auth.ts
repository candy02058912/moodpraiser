// provider coming from Auth0 example: auth0|..., google-oauth2|...
export const extractProvider = (sub: string) => sub.split("|")[0];