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
}

export interface Timetable {
    mon_period_1: string,
    mon_period_2: string,
    mon_period_3: string,
    mon_period_4: string,
    mon_period_5: string,

    tue_period_1: string,
    tue_period_2: string,
    tue_period_3: string,
    tue_period_4: string,
    tue_period_5: string,

    wed_period_1: string,
    wed_period_2: string,
    wed_period_3: string,
    wed_period_4: string,
    wed_period_5: string,

    thu_period_1: string,
    thu_period_2: string,
    thu_period_3: string,
    thu_period_4: string,
    thu_period_5: string,

    fri_period_1: string,
    fri_period_2: string,
    fri_period_3: string,
    fri_period_4: string,
    fri_period_5: string,
}
/*
export function objectToTimetable(body: object): Timetable {
    let timetable: Timetable = {
        fri_period_1: "",
        fri_period_2: "",
        fri_period_3: "",
        fri_period_4: "",
        fri_period_5: "",
        mon_period_1: "",
        mon_period_2: "",
        mon_period_3: "",
        mon_period_4: "",
        mon_period_5: "",
        thu_period_1: "",
        thu_period_2: "",
        thu_period_3: "",
        thu_period_4: "",
        thu_period_5: "",
        tue_period_1: "",
        tue_period_2: "",
        tue_period_3: "",
        tue_period_4: "",
        tue_period_5: "",
        wed_period_1: "",
        wed_period_2: "",
        wed_period_3: "",
        wed_period_4: "",
        wed_period_5: ""

    }
    timetable = (( {uuid, ...rest}) => rest ) (body)



    return timetable
}
*/
