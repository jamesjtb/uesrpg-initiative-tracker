import { MenuItem, Select } from '@mui/material';
import { combatantColors } from '../../contextProviders/combat/values';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';


const ColorSelector = ({ label, value = '', onChange }) => {
    return (
        <Select
            label={label}
            variant="standard"
            value={value}
            onChange={onChange}
            MenuProps={{ style: { maxHeight: '10em' } }}
        >
          {combatantColors.map(color => (
            <MenuItem key={color} value={color}>
              <SquareRoundedIcon fontSize="small" htmlColor={color} />
            </MenuItem> 
          ))}
        </Select>
    );
};

export default ColorSelector;
