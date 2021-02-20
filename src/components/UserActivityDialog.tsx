import React from 'react'
import { observer } from 'mobx-react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MomentUtils from '@date-io/moment'
import {
    MuiPickersUtilsProvider,
    DatePicker
} from '@material-ui/pickers'
import moment, { Moment } from 'moment'

interface UserActivityDialogProps {
    open: boolean,
    handleClose: () => void
    handleSubmit: (e: React.FormEvent, userId: number, registration: Moment, lastActivity: Moment) => void
}

export default observer(
    (props: UserActivityDialogProps) => {
        const [userId, setUserId] = React.useState<number>(1)
        const [registration, setRegistration] = React.useState<Moment | null>(moment())
        const [lastActivity, setLastActivity] = React.useState<Moment | null>(moment())

        return (
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Create record</DialogTitle>
                <DialogContent>
                    <form
                        id='create-user-activity-form'
                        onSubmit={(e: React.FormEvent) => props.handleSubmit(e, userId, registration!, lastActivity!)}
                        style={{ display: 'flex', flexDirection: 'column' }}
                    >
                        <TextField
                            label='User ID'
                            type='number'
                            InputProps={{ inputProps: { min: 1 } }}
                            required
                            value={userId}
                            onChange={(event => setUserId(event.target.value ? parseInt(event.target.value) : 0))}
                        />
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <DatePicker
                                disableToolbar
                                variant='inline'
                                format='DD/MM/yyyy'
                                label='Registration date'
                                value={registration}
                                onChange={setRegistration}
                                required
                                margin='normal'
                            />
                            <DatePicker
                                disableToolbar
                                variant='inline'
                                format='DD/MM/yyyy'
                                label='Last activity date'
                                value={lastActivity}
                                onChange={setLastActivity}
                                required
                                margin='normal'
                            />
                        </MuiPickersUtilsProvider>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button color='primary' type='submit' form='create-user-activity-form'>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
)
