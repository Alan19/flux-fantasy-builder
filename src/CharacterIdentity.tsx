import {FormControl, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {KarmaSpecialty} from "./KarmaSpecialty.tsx";
import {Affiliation} from "./CharacterSheet.tsx";
import {useCharacterSheetFields} from "./UseCharacterSheetFields.ts";
import {getDefenseModifier, getHealingPercent, getStudies, Study} from "./GetStudies.ts";

export function CharacterIdentity() {
    const characterIdentity = useCharacterSheetFields();
    return (
        <Stack spacing={3}>
            <TextField fullWidth value={characterIdentity.playerName} onChange={(e) => characterIdentity.setPlayerName(e.target.value)} label="Player Name"/>
            <TextField fullWidth value={characterIdentity.characterName} onChange={(e) => characterIdentity.setCharacterName(e.target.value)} label="Character Name"/>
            <TextField fullWidth size={"small"} value={characterIdentity.characterImageURL} onChange={(e) => characterIdentity.setCharacterImageURL(e.target.value)} label="Character Image URL"/>
            <Grid container spacing={1}>
                <Grid size={{xs: 6, md: 3}}>
                    <TextField fullWidth value={characterIdentity.age} onChange={(e) => characterIdentity.setAge(e.target.value)} label="Age"/>
                </Grid>
                <Grid size={{xs: 6, md: 3}}>
                    <TextField fullWidth value={characterIdentity.gender} onChange={(e) => characterIdentity.setGender(e.target.value)} label="Gender"/>
                </Grid>
                <Grid size={{xs: 6, md: 3}}>
                    <TextField fullWidth value={characterIdentity.height} onChange={(e) => characterIdentity.setHeight(e.target.value)} label="Height"/>
                </Grid>
                <Grid size={{xs: 6, md: 3}}>
                    <TextField fullWidth value={characterIdentity.weight} onChange={(e) => characterIdentity.setWeight(e.target.value)} label="Weight"/>
                </Grid>
            </Grid>
            <FormControl>
                <InputLabel>Karma Specialty</InputLabel>
                <Select fullWidth onChange={event => characterIdentity.setKarmaSpecialty(event.target.value as KarmaSpecialty)} value={characterIdentity.karmaSpecialty} label={"Karma Specialty"}>
                    {Object.values(KarmaSpecialty).map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
                </Select>
            </FormControl>
            <Grid container spacing={1}>
                <Grid size={{md: 4}}>
                    <TextField
                        label="Merits"
                        variant={"outlined"}
                        value={characterIdentity.merits}
                        slotProps={{
                            input: {
                                startAdornment: <InputAdornment position="start">⧗</InputAdornment>,
                            },
                        }}
                        type="number"
                        onKeyDown={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        onChange={(e) => characterIdentity.setMerits(Math.max(0, Number(e.target.value)))}
                    />
                </Grid>
                <Grid size={{md: 4}}>
                    <TextField
                        label="Med+ Kits"
                        variant={"outlined"}
                        value={characterIdentity.medKits}
                        type="number"
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        onChange={(e) => characterIdentity.setMedKits(Math.max(0, Number(e.target.value)))}
                    />
                </Grid>
                <Grid size={{md: 4}}>
                    <TextField
                        label="Med+ Kit %"
                        variant={"filled"}
                        value={characterIdentity.karmaSpecialty ? (getHealingPercent(characterIdentity.karmaSpecialty) + "%") : ""}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />
                </Grid>
            </Grid>
            <FormControl disabled={!characterIdentity.karmaSpecialty}>
                <InputLabel>Study</InputLabel>
                <Select fullWidth onChange={event => characterIdentity.setStudy(event.target.value as Study)} value={characterIdentity.study} label={"Study"}>
                    {Object.values(getStudies(characterIdentity.karmaSpecialty)).map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel>Affiliation</InputLabel>
                <Select fullWidth onChange={event => characterIdentity.setAffiliation(event.target.value as Affiliation)} value={characterIdentity.affiliation} label={"Affiliation"}>
                    {Object.values(Affiliation).map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
                </Select>
            </FormControl>
            <Grid container spacing={1}>
                <Grid size={{xs: 12}}><Typography variant={"h6"}>Talents</Typography></Grid>
                <Grid size={{xs: 6, md: 4}}>
                    <FormControl fullWidth>
                        <InputLabel>Aura</InputLabel>
                        <Select onChange={event => characterIdentity.setAura(Number(event.target.value))} value={characterIdentity.aura} label={"Aura"}>
                            {[1, 2, 3].map(value => <MenuItem key={value} value={value}>+{value}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{xs: 6, md: 4}}>
                    <FormControl fullWidth>
                        <InputLabel>Stamina</InputLabel>
                        <Select onChange={event => characterIdentity.setStamina(Number(event.target.value))} value={characterIdentity.stamina} label={"Stamina"}>
                            {[1, 2, 3].map(value => <MenuItem key={value} value={value}>+{value}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{xs: 6, md: 4}}>
                    <FormControl fullWidth>
                        <InputLabel>Agility</InputLabel>
                        <Select onChange={event => characterIdentity.setAgility(Number(event.target.value))} value={characterIdentity.agility} label={"Agility"}>
                            {[1, 2, 3].map(value => <MenuItem key={value} value={value}>+{value}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{xs: 6, md: 4}}>
                    <FormControl fullWidth>
                        <InputLabel>Technique</InputLabel>
                        <Select onChange={event => characterIdentity.setTechnique(Number(event.target.value))} value={characterIdentity.technique} label={"Technique"}>
                            {[1, 2, 3].map(value => <MenuItem key={value} value={value}>+{value}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{xs: 6, md: 4}}>
                    <FormControl fullWidth>
                        <InputLabel>Willpower</InputLabel>
                        <Select onChange={event => characterIdentity.setWillpower(Number(event.target.value))} value={characterIdentity.willpower} label={"Willpower"}>
                            {[1, 2, 3].map(value => <MenuItem key={value} value={value}>+{value}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{xs: 6, md: 4}}>
                    <FormControl fullWidth>
                        <InputLabel>Function</InputLabel>
                        <Select onChange={event => characterIdentity.setFunction(Number(event.target.value))} value={characterIdentity.function} label={"Function"}>
                            {[1, 2, 3].map(value => <MenuItem key={value} value={value}>+{value}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid size={{xs: 6, md: 4}}>
                    <TextField variant={"filled"} slotProps={{input: {readOnly: true,}}} value={10 + (characterIdentity.function ?? 0)} label={"HP"}/>
                </Grid>
                <Grid size={{xs: 6, md: 4}}>
                    <TextField variant={"filled"} slotProps={{input: {readOnly: true,}}} value={characterIdentity.affiliation ? "+" + getDefenseModifier(characterIdentity.affiliation) : ""} label={"DEF"}/>
                </Grid>
                <Grid size={{xs: 6, md: 4}}>
                    <TextField variant={"filled"} slotProps={{input: {readOnly: true,}}} value={1 + (characterIdentity.agility ?? 0)} label={"MOV"}/>
                </Grid>
            </Grid>
            <TextField label={'Background'} multiline value={characterIdentity.background} onChange={event => characterIdentity.setBackground(event.target.value)}/>
            <TextField label={'Torus, Special Weapon, or Sigil Configuration'} multiline value={characterIdentity.configuration} onChange={event => characterIdentity.setConfiguration(event.target.value)}/>
        </Stack>
    );
}