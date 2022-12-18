/*
export interface User {
    uuid: number,
    name: string,
    password: string,
}
export function implementsUser(obj: any): obj is User {
    return (
        typeof obj === 'object' &&
            obj !== null &&
            'uuid' in obj &&
            'name' in obj &&
            'password' in obj
    )
}

export interface UserInfo {
    uuid: number,
    name: string,
}
export function implementsUserInfo(obj: any): obj is UserInfo {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'uuid' in obj &&
        'name' in obj
    )
} */

import test from "node:test";

test