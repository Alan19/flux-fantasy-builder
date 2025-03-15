import {Container, Fade, IconButton, Typography} from "@mui/material";
import {CharacterIdentity} from "./CharacterIdentity.tsx";
import {Link} from "wouter";
import {ArrowForward} from "@mui/icons-material";
import {ModeToggle} from "./ModeToggle.tsx";


export const CharacterInfoInput = () => {
    return <Fade in>
        <div style={{display: "flex", alignItems: "start"}}>
            <Container>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <Link to={'/sheet'} style={{alignSelf: "end"}}>
                        <Typography color={'var(--md-sys-color-onSurface)'}>When you're done filling out information here, click here to view a web version of the Flux Fantasy character
                            sheet!<IconButton><ArrowForward/></IconButton></Typography>
                    </Link>
                </div>
                <CharacterIdentity/>
            </Container>
            <div style={{marginTop: 16, marginRight: 16}}>
                <ModeToggle/>
            </div>
        </div>
    </Fade>
};