declare module "jsonwebtoken" {
  export interface JwtPayload {
    [key: string]: any;
    iss?: string | undefined;
    sub?: string | undefined;
    aud?: string | string[] | undefined;
    exp?: number | undefined;
    nbf?: number | undefined;
    iat?: number | undefined;
    jti?: string | undefined;
  }

  export interface SignOptions {
    algorithm?: string | undefined;
    keyid?: string | undefined;
    expiresIn?: string | number | undefined;
    notBefore?: string | number | undefined;
    audience?: string | string[] | undefined;
    subject?: string | undefined;
    issuer?: string | undefined;
    jwtid?: string | undefined;
    mutatePayload?: boolean | undefined;
    noTimestamp?: boolean | undefined;
    header?: object | undefined;
    encoding?: string | undefined;
  }

  export interface VerifyOptions {
    algorithms?: string[] | undefined;
    audience?: string | RegExp | Array<string | RegExp> | undefined;
    clockTimestamp?: number | undefined;
    clockTolerance?: number | undefined;
    complete?: boolean | undefined;
    issuer?: string | string[] | undefined;
    ignoreExpiration?: boolean | undefined;
    ignoreNotBefore?: boolean | undefined;
    jwtid?: string | undefined;
    nonce?: string | undefined;
    subject?: string | undefined;
    maxAge?: string | number | undefined;
  }

  export class JsonWebTokenError extends Error {
    name: "JsonWebTokenError";
    message: string;
  }

  export class TokenExpiredError extends JsonWebTokenError {
    name: "TokenExpiredError";
    expiredAt: Date;
  }

  export class NotBeforeError extends JsonWebTokenError {
    name: "NotBeforeError";
    date: Date;
  }

  export function sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: string | Buffer,
    options?: SignOptions,
  ): string;

  export function verify(
    token: string,
    secretOrPublicKey: string | Buffer,
    options?: VerifyOptions,
  ): JwtPayload | string;

  export function decode(
    token: string,
    options?: { complete?: boolean | undefined; json?: boolean | undefined },
  ): null | JwtPayload | string;
}

declare module "bcrypt" {
  export function genSalt(rounds?: number): Promise<string>;
  export function genSaltSync(rounds?: number): string;

  export function hash(
    data: string | Buffer,
    salt: string | number,
  ): Promise<string>;
  export function hashSync(
    data: string | Buffer,
    salt: string | number,
  ): string;

  export function compare(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean>;
  export function compareSync(
    data: string | Buffer,
    encrypted: string,
  ): boolean;

  export function getRounds(encrypted: string): number;
}

declare module "react-howler" {
  import * as React from "react";

  export interface ReactHowlerProps {
    src: string;
    format?: string[];
    playing?: boolean;
    mute?: boolean;
    loop?: boolean;
    volume?: number;
    rate?: number;
    seek?: number;
    html5?: boolean;
    onLoad?: () => void;
    onLoadError?: (id: number) => void;
    onPlay?: () => void;
    onPause?: () => void;
    onStop?: () => void;
    onEnd?: () => void;
    onSeek?: () => void;
    onVolume?: () => void;
    onRate?: () => void;
    onFade?: () => void;
    ref?: React.RefObject<any>;
  }

  export default class ReactHowler extends React.Component<ReactHowlerProps> {
    duration(): number;
    seek(seek?: number): number;
  }
}
