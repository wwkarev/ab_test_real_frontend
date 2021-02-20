import React, { useState } from 'react'
import { observer } from 'mobx-react'

import { store } from '../store/Store'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

interface UserActivityGeneratorProps {
    className?: string,
    store: typeof store
}

export default observer(
    (props: UserActivityGeneratorProps) => {
        const [quantity, setQuantity] = useState(1)

        const onSubmit = (e: React.FormEvent) => {
            e.preventDefault()
            props.store.generateUserActivity(quantity)
        }

        return (
            <form
                className={props.className}
                onSubmit={(e: React.FormEvent) => onSubmit(e)}
            >
                <TextField
                    label='Quantity'
                    type='number'
                    InputProps={{ inputProps: { min: 1 } }}
                    required
                    value={quantity}
                    onChange={(event => setQuantity(event.target.value ? parseInt(event.target.value) : 0))}
                />
                <Button color='primary' type='submit'>
                    Generate user activities
                </Button>
            </form>
        )
    }
)
