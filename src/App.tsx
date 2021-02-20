import React from 'react'
import { store } from './store/Store'
import { observer } from 'mobx-react-lite'
import UserActivity from './components/UserActivity'

export default observer(() => {
    return (
        <div>
            <UserActivity store={store} />
        </div>
    )
})
