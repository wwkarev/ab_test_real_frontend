import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { store } from '../store/Store'
import Button from '@material-ui/core/Button'
import UserActivityDialog from './UserActivityDialog'
import { Moment } from 'moment'
import Alert from './Alert'
import RollingRetention from './RollingRetention'
import UserActivityGenerator from './UserActivityGenerator'
import LinearProgress from '@material-ui/core/LinearProgress'
import UserActivityTable from './UserActivityTable'
interface UserActivityProps {
    store: typeof store
}

const AppWrapper = styled.div`
    min-height: 100vh;
    background-color: #E5E5E5;
`
const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const UserActivityContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
`
const RollingRetentionStyled = styled(RollingRetention)`
    margin: 2px 0;
`
const UserActivityGeneratorStyled = styled(UserActivityGenerator)`
    margin: 2px 0
`
const CreateButton = styled(Button)`
    margin: 2px 0;
    align-self: flex-end;
`

const ExtendedUserActivityTable = styled(UserActivityTable)`
    background-color: #FFFFFF;
`
const LinearProgressWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    zIndex: 100;
`

export default observer(
    (props: UserActivityProps) => {
        useEffect(() => {
            props.store.updateUserActivities()
        }, [])

        const [isDialogOpen, setIsDialogOpen] = useState(false)

        const handleDialogClose = () => {
            setIsDialogOpen(false)
        }
        const handleDialogOpen = () => {
            setIsDialogOpen(true)
        }
        const handleDialogSubmit = (e: React.FormEvent, userId: number, registration: Moment, lastActivity: Moment) => {
            e.preventDefault()
            setIsDialogOpen(false)
            props.store.createUserActivity(userId, registration, lastActivity)
        }

        const progress = (
            <LinearProgressWrapper>
                <LinearProgress />
            </LinearProgressWrapper>
        )

        return (
            <AppWrapper>
                <Content>
                    {props.store.loading && progress}
                    <UserActivityContent>
                        <Alert store={props.store} />
                        <RollingRetentionStyled store={props.store} />
                        <UserActivityGeneratorStyled store={props.store} />
                        <CreateButton onClick={handleDialogOpen} variant='contained' color='primary'>Create record</CreateButton>
                        <UserActivityDialog
                            open={isDialogOpen}
                            handleSubmit={handleDialogSubmit}
                            handleClose={handleDialogClose}
                        />
                        <ExtendedUserActivityTable store={props.store} />
                    </UserActivityContent>
                </Content>
            </AppWrapper>
        )
    }
)
