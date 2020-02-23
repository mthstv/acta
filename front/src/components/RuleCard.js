import React, { useState } from "react";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const cardStyle = {
    marginBottom: 15
}

const RuleCard = props => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = event => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (action = null) => {
    setAnchorEl(null);
    return (
      action === 0 ? props.history.push(`regra/${props.ruleId}`) : '',
      action === 1 ? props.history.push(`editar-regra/${props.ruleId}`) : ''
    );
  };

  return (
    <div>
      <Card style={cardStyle}>
        <CardHeader
            action={
            <IconButton className="rule-options" aria-label="more" aria-controls="rule-edit-menu" aria-haspopup="true" onClick={handleMenuClick}>
              <MoreVertIcon/>
            </IconButton>
            }
            title={ props.title }
            subheader={ props.text }
        />
      </Card>
      <Menu
        id="rule-edit-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuClose(0)}>Visualizar</MenuItem>
        <MenuItem onClick={() => handleMenuClose(1)}>Editar</MenuItem>
        <MenuItem onClick={() => handleMenuClose(2)}>Excluir</MenuItem>
      </Menu>
    </div>
  );
}
export default RuleCard;
