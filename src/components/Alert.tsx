import React from 'react'
import { observer } from 'mobx-react'

import { store } from '../store/Store'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

interface AlertProps {
    store: typeof store
}

export default observer(
    (props: AlertProps) => {
        return (
            <Snackbar
                open={props.store.isAlertActive}
                autoHideDuration={props.store.ALERT_TIMEOUT}
                onClose={props.store.disableErrorAlert}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <MuiAlert variant='filled' onClose={props.store.disableErrorAlert} severity={props.store.alertType}>
                    {props.store.alertMessage}
                </MuiAlert>
            </Snackbar>
        )
    }
)
