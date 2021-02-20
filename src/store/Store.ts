import { runInAction, makeAutoObservable } from 'mobx'
import { PageChangeParams } from '@material-ui/data-grid'

import { IUserActivitiesResponse, IUserActivity } from '../types/UserActivityTypes'
import { Moment } from 'moment'
import axios from 'axios'

class Store {
    loading: boolean = false
    rollingRetention: number | undefined
    ROWS_PER_PAGE: number = 10
    pageNumber: number = 0
    userActivitiesCount: number = 1
    userActivities: IUserActivity[] = []
    isAlertActive: boolean = false
    alertMessage: string = ''
    alertType: 'success' | 'info' | 'warning' | 'error' | undefined
    ALERT_TIMEOUT: number = 6000

    constructor() {
        makeAutoObservable(this)
    }

    updateUserActivities = () => {
        this.loading = true
        const offset = this.pageNumber * this.ROWS_PER_PAGE
        axios.get<IUserActivitiesResponse>(`${process.env.REACT_APP_SERVER_URL}/user_activity?offset=${offset}&limit=${this.ROWS_PER_PAGE}`)
            .then(res => res.data)
            .then((res) => {
                this.userActivitiesCount = res.count
                this.userActivities = res.rows
            })
            .catch((error) => {
                this.setAlertProperties(this.getErrorMessage(error), 'error')
            })
            .finally(() => {
                runInAction(() => {
                    this.loading = false
                })
            })
    }

    createUserActivity = (userId: number, registration: Moment, lastActivity: Moment) => {
        const data = {
            userId,
            registration: registration.format('YYYY-MM-DD'),
            lastActivity: lastActivity.format('YYYY-MM-DD')
        }

        axios.post(
            `${process.env.REACT_APP_SERVER_URL}/user_activity`,
            data,
            { headers: { 'Content-Type': 'application/json' } }
        )
            .then((res) => {
                this.updateUserActivities()
                this.setAlertProperties('User created', 'success')
            })
            .catch((error) => {
                this.setAlertProperties(this.getErrorMessage(error), 'error')
            })
    }

    calculateRollingRetention = (nDays: number) => {
        this.loading = true
        axios.get<number>(`${process.env.REACT_APP_SERVER_URL}/user_activity/rolling_retention?ndays=${nDays}`)
            .then(res => res.data)
            .then((res) => {
                console.log(res)
                this.rollingRetention = res
            })
            .catch((error) => {
                this.setAlertProperties(this.getErrorMessage(error), 'error')
            })
            .finally(() => {
                runInAction(() => {
                    this.loading = false
                })
            })
    }

    generateUserActivity = (quantity: number) => {
        const data = {
            quantity
        }

        this.loading = true
        axios.post(
            `${process.env.REACT_APP_SERVER_URL}/user_activity/generate_records`,
            data,
            { headers: { 'Content-Type': 'application/json' } }
        )
            .then((res) => {
                this.updateUserActivities()
            })
            .catch((error) => {
                this.setAlertProperties(this.getErrorMessage(error), 'error')
            })
            .finally(() => {
                this.loading = false
            })
    }

    handlePageChange = (params: PageChangeParams) => {
        this.pageNumber = params.page
        this.updateUserActivities()
    }

    disableErrorAlert = () => {
        this.isAlertActive = false
    }

    getErrorMessage = (error: any) => {
        console.log(JSON.stringify(error))
        console.log(JSON.stringify(error.response))
        console.log(JSON.stringify(error.request))
        let message = error.response?.data?.errors?.[0]?.message
        if (message) {
            return message
        }
        message = error.response?.data?.[0]?.msg
        if (message) {
            return message
        }
        message = error.response?.data
        if (message) {
            return message
        }
        message = error.message
        if (message) {
            return message
        }
        return 'Unknown error'
    }

    setAlertProperties = (message: string, alertType: 'success' | 'info' | 'warning' | 'error' | undefined) => {
        this.isAlertActive = true
        this.alertMessage = message
        this.alertType = alertType
    }
}

export const store = new Store()
