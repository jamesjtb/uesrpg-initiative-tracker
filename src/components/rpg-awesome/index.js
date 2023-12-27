import Icon from '@mui/material/Icon';
import '../../../node_modules/rpg-awesome/css/rpg-awesome.min.css';

export const RaIcon = ({ iconName, ...props }) => <Icon baseClassName={`ra ${iconName}`} {...props} />
