import {Container, Fade, Grid2, IconButton, Typography, useMediaQuery, useTheme} from "@mui/material";
import {CharacterIdentity} from "./CharacterIdentity.tsx";
import {Link} from "wouter";
import {ArrowForward} from "@mui/icons-material";
import {ModeToggle} from "./ModeToggle.tsx";
import {ColoredLogo} from "./ColoredLogo.tsx";

export const CharacterInfoInput = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('xl'));

    return <Fade in>
        <div style={{display: matches ? "flex" : "inherit"}}>
            <Container>
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Link to={'/sheet'}>
                        <Typography color={'var(--md-sys-color-onSurface)'}>
                            When you're done filling out information here, click here to view a web version of the Flux Fantasy character sheet!<IconButton><ArrowForward/></IconButton>
                        </Typography>
                    </Link>
                </div>
                <Grid2 container spacing={1}>
                    <Grid2 size={{md: 4}} style={{overflow: "hidden"}}>
                        <ColoredLogo/>
                        <Typography variant={"subtitle2"}>Character Builder</Typography>
                    </Grid2>
                </Grid2>
                <CharacterIdentity/>
            </Container>
            <div style={matches ? {position: 'fixed', top: 16, right: 16} : {marginTop: 16}}>
                {matches ? <ModeToggle/> : <Container><ModeToggle/></Container>}
            </div>
        </div>
    </Fade>
};