// package: google.api
// file: google/api/auth.proto

import * as jspb from "google-protobuf";

export class Authentication extends jspb.Message {
  clearRulesList(): void;
  getRulesList(): Array<AuthenticationRule>;
  setRulesList(value: Array<AuthenticationRule>): void;
  addRules(value?: AuthenticationRule, index?: number): AuthenticationRule;

  clearProvidersList(): void;
  getProvidersList(): Array<AuthProvider>;
  setProvidersList(value: Array<AuthProvider>): void;
  addProviders(value?: AuthProvider, index?: number): AuthProvider;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Authentication.AsObject;
  static toObject(includeInstance: boolean, msg: Authentication): Authentication.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Authentication, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Authentication;
  static deserializeBinaryFromReader(message: Authentication, reader: jspb.BinaryReader): Authentication;
}

export namespace Authentication {
  export type AsObject = {
    rulesList: Array<AuthenticationRule.AsObject>,
    providersList: Array<AuthProvider.AsObject>,
  }
}

export class AuthenticationRule extends jspb.Message {
  getSelector(): string;
  setSelector(value: string): void;

  hasOauth(): boolean;
  clearOauth(): void;
  getOauth(): OAuthRequirements | undefined;
  setOauth(value?: OAuthRequirements): void;

  getAllowWithoutCredential(): boolean;
  setAllowWithoutCredential(value: boolean): void;

  clearRequirementsList(): void;
  getRequirementsList(): Array<AuthRequirement>;
  setRequirementsList(value: Array<AuthRequirement>): void;
  addRequirements(value?: AuthRequirement, index?: number): AuthRequirement;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthenticationRule.AsObject;
  static toObject(includeInstance: boolean, msg: AuthenticationRule): AuthenticationRule.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AuthenticationRule, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthenticationRule;
  static deserializeBinaryFromReader(message: AuthenticationRule, reader: jspb.BinaryReader): AuthenticationRule;
}

export namespace AuthenticationRule {
  export type AsObject = {
    selector: string,
    oauth?: OAuthRequirements.AsObject,
    allowWithoutCredential: boolean,
    requirementsList: Array<AuthRequirement.AsObject>,
  }
}

export class JwtLocation extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): string;
  setHeader(value: string): void;

  hasQuery(): boolean;
  clearQuery(): void;
  getQuery(): string;
  setQuery(value: string): void;

  hasCookie(): boolean;
  clearCookie(): void;
  getCookie(): string;
  setCookie(value: string): void;

  getValuePrefix(): string;
  setValuePrefix(value: string): void;

  getInCase(): JwtLocation.InCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): JwtLocation.AsObject;
  static toObject(includeInstance: boolean, msg: JwtLocation): JwtLocation.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: JwtLocation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): JwtLocation;
  static deserializeBinaryFromReader(message: JwtLocation, reader: jspb.BinaryReader): JwtLocation;
}

export namespace JwtLocation {
  export type AsObject = {
    header: string,
    query: string,
    cookie: string,
    valuePrefix: string,
  }

  export enum InCase {
    IN_NOT_SET = 0,
    HEADER = 1,
    QUERY = 2,
    COOKIE = 4,
  }
}

export class AuthProvider extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getIssuer(): string;
  setIssuer(value: string): void;

  getJwksUri(): string;
  setJwksUri(value: string): void;

  getAudiences(): string;
  setAudiences(value: string): void;

  getAuthorizationUrl(): string;
  setAuthorizationUrl(value: string): void;

  clearJwtLocationsList(): void;
  getJwtLocationsList(): Array<JwtLocation>;
  setJwtLocationsList(value: Array<JwtLocation>): void;
  addJwtLocations(value?: JwtLocation, index?: number): JwtLocation;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthProvider.AsObject;
  static toObject(includeInstance: boolean, msg: AuthProvider): AuthProvider.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AuthProvider, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthProvider;
  static deserializeBinaryFromReader(message: AuthProvider, reader: jspb.BinaryReader): AuthProvider;
}

export namespace AuthProvider {
  export type AsObject = {
    id: string,
    issuer: string,
    jwksUri: string,
    audiences: string,
    authorizationUrl: string,
    jwtLocationsList: Array<JwtLocation.AsObject>,
  }
}

export class OAuthRequirements extends jspb.Message {
  getCanonicalScopes(): string;
  setCanonicalScopes(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OAuthRequirements.AsObject;
  static toObject(includeInstance: boolean, msg: OAuthRequirements): OAuthRequirements.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: OAuthRequirements, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OAuthRequirements;
  static deserializeBinaryFromReader(message: OAuthRequirements, reader: jspb.BinaryReader): OAuthRequirements;
}

export namespace OAuthRequirements {
  export type AsObject = {
    canonicalScopes: string,
  }
}

export class AuthRequirement extends jspb.Message {
  getProviderId(): string;
  setProviderId(value: string): void;

  getAudiences(): string;
  setAudiences(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthRequirement.AsObject;
  static toObject(includeInstance: boolean, msg: AuthRequirement): AuthRequirement.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AuthRequirement, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthRequirement;
  static deserializeBinaryFromReader(message: AuthRequirement, reader: jspb.BinaryReader): AuthRequirement;
}

export namespace AuthRequirement {
  export type AsObject = {
    providerId: string,
    audiences: string,
  }
}

