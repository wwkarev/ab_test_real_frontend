import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import { store } from '../store/Store'
import { ColDef, DataGrid } from '@material-ui/data-grid'
import moment from 'moment'

const DataGridWrapper = styled.div`
    height: 650px;
    width: 650px;
`

interface UserActivityTableProps {
    className?: string,
    store: typeof store
}

export default observer(
    (props: UserActivityTableProps) => {
        const columns: ColDef[] = [
            { field: 'userId', headerName: 'UserID', sortable: false, disableColumnMenu: true, width: 200 },
            { field: 'registration', headerName: 'Date Registration', sortable: false, disableColumnMenu: true, width: 200 },
            { field: 'lastActivity', headerName: 'Date Last Activity', sortable: false, disableColumnMenu: true, width: 200 }
        ]
        const rows = props.store.userActivities.map((userActivity) => {
            return {
                id: userActivity.id,
                userId: userActivity.userId,
                registration: moment(userActivity.registration).format('DD-MM-YYYY'),
                lastActivity: moment(userActivity.lastActivity).format('DD-MM-YYYY')
            }
        })

        return (
            <DataGridWrapper className={props.className}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={props.store.ROWS_PER_PAGE}
                    rowsPerPageOptions={[props.store.ROWS_PER_PAGE]}
                    rowCount={props.store.userActivitiesCount}
                    paginationMode='server'
                    onPageChange={props.store.handlePageChange}
                />
            </DataGridWrapper>
        )
    }
)
