import React, { ReactElement } from 'react';
import { TableCell } from '@mui/material';

const Tab: React.FC<{val: any}> = ({ val }: any) => {
    const x = 0;
    return (
        <div>
            <TableCell>{val}</TableCell>
        </div>
    );
};

export default Tab;