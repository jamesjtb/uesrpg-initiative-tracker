import Button from '@mui/material/Button';

import { toTitleCase } from '../../util/strUtils';

export const Actions = {
    SAVE: 'SAVE',
    CANCEL: 'CANCEL',
};

const actionVariantMap = {
    [Actions.SAVE]: 'contained',
    [Actions.CANCEL]: 'outlined',
};

const ActionButton = ({onClick, action, sx}) => {
    return (
        <Button sx={{m: 1}} variant={actionVariantMap[action]} onClick={onClick}>
            {toTitleCase(action)}
        </Button>
    );
};

export default ActionButton;