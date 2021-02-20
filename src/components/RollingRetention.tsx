import React, { useState } from 'react'
import { observer } from 'mobx-react'

import { store } from '../store/Store'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

interface RollingRetentionProps {
    className?: string,
    store: typeof store
}

export default observer(
    (props: RollingRetentionProps) => {
        const [nDays, setNDays] = useState(1)

        const onSubmit = (e: React.FormEvent) => {
            e.preventDefault()
            props.store.calculateRollingRetention(nDays)
        }

        return (
            <form
                className={props.className}
                onSubmit={onSubmit}
            >
                <TextField
                    label='N days'
                    type='number'
                    InputProps={{ inputProps: { min: 1 } }}
                    required
                    value={nDays}
                    onChange={(event => setNDays(event.target.value ? parseInt(event.target.value) : 0))}
                />
                <Button color='primary' type='submit'>
                    Calculate rolling retention
                </Button>
                {props.store.rollingRetention && props.store.rollingRetention}
            </form>
        )
    }
)
