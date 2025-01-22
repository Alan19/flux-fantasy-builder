import {Box, Container, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {PowerProfile} from "./PowerProfile.tsx";
import {CharacterIdentity} from "./CharacterIdentity.tsx";
import {useCharacterSheetFields} from "./UseCharacterSheetFields.ts";
import {getKarmaPowerLoadout} from "./KarmaPowerLoadout.ts";


export enum Affiliation {
    wolfgangAcademy = 'Wolfgang Academy',
    gears = 'Great Escape Artist Society',
    inkFightingElite = 'Ink Fighting Elite',
    nka = 'National Karmastry Authority',
    clockbotUnion = 'Clockbot Union',
    independent = 'Independent'
}

export const CharacterSheet = () => {
    const {karmaSpecialty, study} = useCharacterSheetFields();
    return <Container>
        <Grid container spacing={3}>
            <Grid size={{md: 5, xs: 12}}>
                <CharacterIdentity/>
            </Grid>
            <Grid size={{md: 7, xs: 12}}>
                {(karmaSpecialty && study) ? <PowerProfile powers={getKarmaPowerLoadout(karmaSpecialty, study)}/> : <Box><Typography variant={"h2"}>Select a Karma Study to view Karma Powers!</Typography></Box>}
            </Grid>
        </Grid>
    </Container>
};