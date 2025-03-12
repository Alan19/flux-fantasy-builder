import {Container, Fade, IconButton, Typography} from "@mui/material";
import {CharacterIdentity} from "./CharacterIdentity.tsx";
import {Link} from "wouter";
import {ArrowForward} from "@mui/icons-material";


export const CharacterInfoInput = () => {
    return <Fade in>
        <Container>
            <div style={{display: "flex", flexDirection: "column"}}>
                <Link to={'/sheet'} style={{alignSelf: "end"}}>
                    <Typography>When you're done filling out information here, click here to view a web version of the Flux Fantasy character sheet!<IconButton><ArrowForward/></IconButton></Typography>
                </Link>
            </div>
            <CharacterIdentity/>
        </Container>
    </Fade>
};