import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import Nav from './Nav';
import MenuList from '@material-ui/core/MenuList';
import { app } from "./base";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
    backgroundColor: '#424242',
  },
  link: {
    textDecorationLine: 'none',
    color: 'inherit',
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [loginEl, setLoginEl] = React.useState(null);
  app.auth().onAuthStateChanged((user) => {
    user ? setLoginEl(true) : setLoginEl(null);
  });

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <React.Fragment key={'left'}>
            <IconButton onClick={toggleDrawer('left', true)} 
              edge="start" 
              className={classes.menuButton} 
              color="inherit" 
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
              <div
                className={classes.list}
                role="presentation"
                onClick={toggleDrawer('left', false)}
                onKeyDown={toggleDrawer('left', false)}
              >
                <MenuList>
                  <Nav />
                </MenuList>
              </div>
            </Drawer>
          </React.Fragment>
          <Typography variant="h6" className={classes.title}>
            Portfolio
          </Typography>
          {loginEl && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <a href="/myaccount"className={classes.link}>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </a>
                <a href="/logout" className={classes.link}>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </a>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
