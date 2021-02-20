export interface IUserActivity {
    id: number,
    userId: number,
    registration: Date,
    lastActivity: Date
}

export interface IUserActivitiesResponse {
    count: number,
    rows: IUserActivity[]
}
