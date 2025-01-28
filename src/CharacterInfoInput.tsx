import {Box, Container, Fade, IconButton, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {PowerProfile} from "./PowerProfile.tsx";
import {CharacterIdentity} from "./CharacterIdentity.tsx";
import {useCharacterSheetFields} from "./UseCharacterSheetFields.ts";
import {getKarmaPowerLoadout} from "./KarmaPowerLoadout.ts";
import {TraitAndFlawTable} from "./TraitAndFlawTable.tsx";
import {Link} from "wouter";
import {ArrowForward} from "@mui/icons-material";


export const CharacterInfoInput = () => {
    const {karmaSpecialty, study} = useCharacterSheetFields();
    return <Fade in>
        <Container>
            <div style={{display: "flex", flexDirection: "column"}}>
                <Link to={'/sheet'} style={{alignSelf: "end"}}>
                    <Typography>When you're done filling out information here, click here to view a web version of the Flux Fantasy character sheet!<IconButton><ArrowForward/></IconButton></Typography>
                </Link>
            </div>
            <Grid container spacing={3}>
                <Grid size={{md: 5, xs: 12}}>
                    <CharacterIdentity/>
                </Grid>
                <Grid size={{md: 7, xs: 12}}>
                    {(karmaSpecialty && study) ? <PowerProfile powers={getKarmaPowerLoadout(karmaSpecialty, study)}/> : <Box><Typography variant={"h2"}>Select a Karma Study to view Karma Powers!</Typography></Box>}
                    <TraitAndFlawTable/>
                </Grid>
            </Grid>
        </Container>
    </Fade>
};