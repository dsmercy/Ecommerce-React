import { AppBar, Toolbar, Typography, Switch } from "@mui/material";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

export default function Header() {
    return (
        <AppBar position='static' sx={{mb: 4}}>
            <Toolbar>
                <Typography variant='h6'>
                    RE-STORE
                </Typography>
            </Toolbar>
        </AppBar>
    )
}