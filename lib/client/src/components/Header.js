import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { theme } from '../theme';
import logo from '../static_data/logo.png'
function Header({ page }) {
    const img_size = {
        "max-width": "15em",
        height: "auto"
    }
    return (
        <div>
            <AppBar position="static" color={theme.header.color} elevation={1}>
                <Toolbar>
                    <Typography style={{ flexGrow: 1 }}>
                        {/* <Button size="large" >NBA</Button> */}
                        <img src={logo} style={img_size} />

                    </Typography>
                    {/* <Button color="black">About</Button>
                    <Button color="black">Contact</Button> */}
                </Toolbar>
            </AppBar>
        </div >
    )
}

export default Header
