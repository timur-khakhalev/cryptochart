import React, { FC } from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux'
import { ISnackbar } from '../interfaces/ISnack';
import { snackToggle } from '../redux/slice'
import { RootState } from '../redux/store'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
    props,
    ref,
) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Snack: FC<ISnackbar> = ({ message, type }) => {
    const dispatch = useDispatch()
    const snackState = useSelector((state: RootState) => state.snackToggle.snack);

    return (
        <Snackbar open={snackState} autoHideDuration={3500} anchorOrigin={{ horizontal: 'right', vertical: 'top' }} onClose={() => dispatch(snackToggle())}>
            <Alert onClose={() => dispatch(snackToggle())} severity={type === 'success' ? 'success' : type === 'error' ? 'error' : type === 'warning' ? 'warning' : 'info'} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}
