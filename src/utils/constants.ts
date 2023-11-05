export const ALREADY_EXISTS_MESSAGE = (
  entity: string = "user",
  property: string = "id",
) => `${entity} with specified ${property} already exists`;

export const NOT_FOUND_MESSAGE = (
  entity: string = "user",
  property: string = "id",
) => `${entity} with specified ${property} not found`;

export const AUTHORIZATION_ERROR_MESSAGE = "Email or Password is not correct";
export const SPECIFIED_MEDIA_NOT_FOUND = "Media for specified user not found";

export const DEFAULT_AVATAR = "https://i.pravatar.cc/300";

export enum Roles {
  CLIENT = "CLIENT",
}

export const CRYPTO_SALT = 10;
