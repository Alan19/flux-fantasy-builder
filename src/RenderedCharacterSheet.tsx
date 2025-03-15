import {Box, Container, Fade, IconButton, InputAdornment, Paper, Stack, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useCharacterSheetFields} from "./UseCharacterSheetFields.ts";
import {PowerProfileTable} from "./PowerProfileTable.tsx";
import {getKarmaPowerLoadout} from "./KarmaPowerLoadout.ts";
import {getDefenseModifier, getEffectiveTalents, getHealingPercent, getMaxHP, getMaxKarma, getMovModifier, KarmaSpecialty} from "./KarmaSpecialty.ts";
import {ArrowBack, ArrowUpward, Check, DirectionsRun, Favorite, Recommend, Shield, Warning} from "@mui/icons-material";
import {Link} from "wouter";
import {TraitAndFlawTable} from "./TraitAndFlawTable.tsx";
import fluxFantasyLogo from "./assets/ff_logo_transparent_cropped.png"
import {useEffect, useState} from "react";
import {TypographyWithAdornment} from "./TypographyWithAdornment.tsx";
import {shadedBoxStyle} from "./ShadedBoxStyle.tsx";
import {Button} from "@mui/material-next";
import {SkillTree} from "./SkillTree.tsx";
import {ModeToggle} from "./ModeToggle.tsx";


function getAdvantages(karmaSpecialty: KarmaSpecialty, level: number): string {
    let advantages = "";
    switch (karmaSpecialty) {
        case KarmaSpecialty.escapeArtist:
            advantages += "● Escape Artists can replenish 10 KP when completely depleted in battle"
            break
        case KarmaSpecialty.clockbot:
            advantages += "● Can absorb 50% of payback and karma-weapon attacks without taking damage, halving all potential damage"
            break
        case KarmaSpecialty.inkFighter:
            advantages += "● Can trade Movement for an extra action in combat"
            break
        case KarmaSpecialty.specialAgent:
            advantages += "● Receive 10% of their current merit balance as a government-approved bonus and an extra Med+ Kit after each checkpoint"
            break
    }
    if (level >= 2) {
        advantages += "\n● +5 to your Karma Pool"
    }
    if (level >= 3) {
        advantages += "\n● +7 to your HP"
    }
    if (level >= 4) {
        advantages += "\n● Extra Skill Tree point just for this level"
    }
    if (level >= 5) {
        advantages += "\n● +1 to any Talent"
    }
    if (level >= 6) {
        advantages += "\n● 10% increase in all shop discounts"
    }
    if (level >= 7) {
        advantages += "\n● +1 to DEF"
    }
    if (level >= 8) {
        advantages += "\n● +1 to MOV"
    }
    if (level >= 9) {
        advantages += "\n● All one-time items can be used twice"
    }
    if (level >= 10) {
        advantages += "\n● +10 to your Karma Pool"
    }

    return advantages;
}

function getSpecialItems(karmaSpecialty: KarmaSpecialty) {
    switch (karmaSpecialty) {
        case KarmaSpecialty.specialAgent:
            return "1 Security Badge (Common Clearance)"
        case KarmaSpecialty.inkFighter:
            return "3 Ink Syringes"
        case KarmaSpecialty.clockbot:
            return "1 Large Internal Torus"
        case KarmaSpecialty.escapeArtist:
            return "1 Large or 2 Small Toruses"
    }
}

export function RenderedCharacterSheet() {
    const characterSheetFields = useCharacterSheetFields();
    const [effectiveTalents, boostedTalents] = getEffectiveTalents(characterSheetFields.study, characterSheetFields.aura, characterSheetFields.technique, characterSheetFields.stamina, characterSheetFields.function, characterSheetFields.willpower, characterSheetFields.agility)
    const [printMode, setPrintMode] = useState(false)

    function printCharacterSheet() {
        setPrintMode(true);
    }

    useEffect(() => {
        if (printMode) {
            window.print()
            setPrintMode(false)
        }
    }, [printMode])


    return <Fade in>
        <div style={{display: "flex"}}>
            <Container>
                {!printMode && <div>
                    <Link to={'/'}>
                        <Typography><IconButton><ArrowBack/></IconButton>Made a mistake? Click here to go back and correct your character's origin!</Typography>
                    </Link>
                </div>}

                <Grid container spacing={2}>
                    <Grid size={{md: 4}}>
                        <img src={fluxFantasyLogo} style={{width: '100%'}} alt={'The logo of Flux Fantasy, consisting of a stylized version of the text "Flux Fantasy"'}/>
                        <Typography variant={"subtitle2"}>Character Sheet</Typography>
                    </Grid>
                    <Grid size={{md: 8}}>
                        <TextField fullWidth variant={"outlined"} value={characterSheetFields.playerName} label={"Player Name"} slotProps={{input: {readOnly: true}}}/>
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{marginTop: 16}}>
                    <Grid size={{md: 3}}>
                        <Stack spacing={2}>
                            <div>
                                <TypographyWithAdornment text={"Portrait"}/>
                                <img src={characterSheetFields.characterImageURL} style={{width: "100%", clipPath: 'polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)'}}/>
                            </div>
                            <div>
                                <Grid container spacing={1} style={{marginTop: 8}}>
                                    <Grid size={{xs: 6}}>
                                        <TextField onKeyDown={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                                   onChange={(e) => characterSheetFields.setPositiveKarma(Math.max(0, Number(e.target.value)))}
                                                   fullWidth
                                                   variant={"outlined"}
                                                   type={"number"}
                                                   value={characterSheetFields.positiveKarma}
                                                   label={"Positive KAP"}/>
                                    </Grid>
                                    <Grid size={{xs: 6}}>
                                        <TextField onKeyDown={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                                   onChange={(e) => characterSheetFields.setNegativeKarma(Math.max(0, Number(e.target.value)))}
                                                   fullWidth
                                                   variant={"outlined"}
                                                   type={"number"}
                                                   value={characterSheetFields.negativeKarma}
                                                   label={"Negative KAP"}/>
                                    </Grid>
                                </Grid>
                            </div>
                            <TextField label={'Advantages'}
                                       multiline
                                       slotProps={{input: {readOnly: true}}}
                                       value={characterSheetFields.karmaSpecialty ? getAdvantages(characterSheetFields.karmaSpecialty, characterSheetFields.level) : ""}/>
                            <Grid container spacing={1}>
                                <Grid size={{md: 4}}>
                                    <TextField
                                        label="Merits"
                                        variant={"outlined"}
                                        value={characterSheetFields.merits}
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
                                        onChange={(e) => characterSheetFields.setMerits(Math.max(0, Number(e.target.value)))}
                                    />
                                </Grid>
                                <Grid size={{md: 4}}>
                                    <TextField
                                        label="Med+ Kit #"
                                        variant={"outlined"}
                                        value={characterSheetFields.medKits}
                                        type="number"
                                        onKeyDown={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                        onChange={(e) => characterSheetFields.setMedKits(Math.max(0, Number(e.target.value)))}
                                    />
                                </Grid>
                                <Grid size={{md: 4}}>
                                    <TextField
                                        label="Med+ Kit %"
                                        variant={"outlined"}
                                        value={characterSheetFields.karmaSpecialty ? (getHealingPercent(characterSheetFields.karmaSpecialty) + "%") : ""}
                                        slotProps={{input: {readOnly: true}}}
                                    />
                                </Grid>
                            </Grid>
                            <TextField label={'Special Items'} multiline value={characterSheetFields.karmaSpecialty ? getSpecialItems(characterSheetFields.karmaSpecialty) : ""} slotProps={{input: {readOnly: true}}}/>
                            <TextField fullWidth label={'Background'} multiline value={characterSheetFields.background} slotProps={{input: {readOnly: true}}}/>
                            <TextField fullWidth label={'Torus, Special Weapon, or Sigil Configuration'} multiline value={characterSheetFields.configuration} slotProps={{input: {readOnly: true}}}/>
                        </Stack>
                    </Grid>
                    <Grid size={{md: 6}}>
                        <Stack spacing={2}>
                            <div>
                                <TypographyWithAdornment text={"Identity"}/>
                                <Paper>
                                    <Grid container spacing={2} style={shadedBoxStyle}>
                                        <Grid size={{xs: 12}}>
                                            <TextField fullWidth variant={"outlined"} value={characterSheetFields.characterName} label={"Character Name (+Alias)"} slotProps={{input: {readOnly: true}}}/>
                                        </Grid>
                                        <Grid size={{md: 3}}>
                                            <TextField fullWidth variant={"outlined"} value={characterSheetFields.age} label={"Age"} slotProps={{input: {readOnly: true}}}/>
                                        </Grid>
                                        <Grid size={{md: 3}}>
                                            <TextField fullWidth variant={"outlined"} value={characterSheetFields.gender} label={"Gender"} slotProps={{input: {readOnly: true}}}/>
                                        </Grid>
                                        <Grid size={{md: 3}}>
                                            <TextField fullWidth variant={"outlined"} value={characterSheetFields.height} label={"Height"} slotProps={{input: {readOnly: true}}}/>
                                        </Grid>
                                        <Grid size={{md: 3}}>
                                            <TextField fullWidth variant={"outlined"} value={characterSheetFields.weight} label={"Weight"} slotProps={{input: {readOnly: true}}}/>
                                        </Grid>
                                        <Grid size={{md: 6}}>
                                            <TextField fullWidth variant={"outlined"} value={characterSheetFields.karmaSpecialty} label={"Karma Specialty"} slotProps={{input: {readOnly: true}}}/>
                                        </Grid>
                                        <Grid size={{md: 6}}>
                                            <TextField fullWidth variant={"outlined"} value={characterSheetFields.affiliation} label={"Affiliation"} slotProps={{input: {readOnly: true}}}/>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </div>
                            <div>
                                <TypographyWithAdornment text={"Talents"}/>
                                <Paper>
                                    <Grid container spacing={2} style={shadedBoxStyle}>
                                        {/*TODO Add adornment and score increase for study talent boost*/}
                                        <Grid size={{md: 2}}>
                                            <TextField fullWidth
                                                       variant={"standard"}
                                                       value={"+" + effectiveTalents.aura}
                                                       label={"Aura"}
                                                       slotProps={{input: {readOnly: true, endAdornment: boostedTalents.includes("Aura") && <InputAdornment position="start"><ArrowUpward/></InputAdornment>}}}/>
                                        </Grid>
                                        <Grid size={{md: 2}}>
                                            <TextField fullWidth
                                                       variant={"standard"}
                                                       value={"+" + effectiveTalents.technique}
                                                       label={"Technique"}
                                                       slotProps={{input: {readOnly: true, endAdornment: boostedTalents.includes("Technique") && <InputAdornment position="start"><Recommend/></InputAdornment>}}}/>
                                        </Grid>
                                        <Grid size={{md: 2}}>
                                            <TextField fullWidth
                                                       variant={"standard"}
                                                       value={"+" + effectiveTalents.stamina}
                                                       label={"Stamina"}
                                                       slotProps={{input: {readOnly: true, endAdornment: boostedTalents.includes("Stamina") && <InputAdornment position="start"><ArrowUpward/></InputAdornment>}}}/>
                                        </Grid>
                                        <Grid size={{md: 2}}>
                                            <TextField fullWidth
                                                       variant={"standard"}
                                                       value={"+" + effectiveTalents.function}
                                                       label={"Function"}
                                                       slotProps={{input: {readOnly: true, endAdornment: boostedTalents.includes("Function") && <InputAdornment position="start"><ArrowUpward/></InputAdornment>}}}/>
                                        </Grid>
                                        <Grid size={{md: 2}}>
                                            <TextField fullWidth
                                                       variant={"standard"}
                                                       value={"+" + effectiveTalents.willpower}
                                                       label={"Willpower"}
                                                       slotProps={{input: {readOnly: true, endAdornment: boostedTalents.includes("Willpower") && <InputAdornment position="start"><ArrowUpward/></InputAdornment>}}}/>
                                        </Grid>
                                        <Grid size={{md: 2}}>
                                            <TextField fullWidth
                                                       variant={"standard"}
                                                       value={"+" + effectiveTalents.agility}
                                                       label={"Agility"}
                                                       slotProps={{input: {readOnly: true, endAdornment: boostedTalents.includes("Agility") && <InputAdornment position="start"><ArrowUpward/></InputAdornment>}}}/>
                                        </Grid>
                                        {/*TODO Add number range validation for level / HP / karma pool*/}
                                        <Grid size={{md: 4}}>
                                            <TextField variant={"filled"}
                                                       slotProps={{
                                                           input: {
                                                               startAdornment: <InputAdornment position="start"><Favorite/></InputAdornment>,
                                                               endAdornment: <InputAdornment position="start">/ {getMaxHP(effectiveTalents, characterSheetFields.level)}</InputAdornment>
                                                           }
                                                       }}
                                                       onKeyPress={(event) => {
                                                           if (!/[0-9]/.test(event.key)) {
                                                               event.preventDefault();
                                                           }
                                                       }}
                                                       type={"number"}
                                                       onChange={(e) => characterSheetFields.setCurrentHP(Math.max(0, Number(e.target.value)))}
                                                       value={characterSheetFields.currentHP}
                                                       label={"HP"}/>
                                        </Grid>
                                        <Grid size={{md: 4}}>
                                            <TextField variant={"filled"}
                                                       slotProps={{input: {readOnly: true, startAdornment: <InputAdornment position="start"><Shield/></InputAdornment>}}}
                                                       value={characterSheetFields.affiliation ? "+" + getDefenseModifier(characterSheetFields.affiliation, characterSheetFields.level) : "+1"}
                                                       label={"DEF"}/>
                                        </Grid>
                                        <Grid size={{md: 4}}>
                                            <TextField variant={"filled"}
                                                       slotProps={{input: {readOnly: true, startAdornment: <InputAdornment position="start"><DirectionsRun/></InputAdornment>}}}
                                                       value={getMovModifier(effectiveTalents, characterSheetFields.level)}
                                                       label={"MOV"}/>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </div>
                            <div>
                                <TypographyWithAdornment text={"Karma Power Profile"}/>
                                {(characterSheetFields.karmaSpecialty && characterSheetFields.study) ?
                                    <Paper style={{background: "var(--md-sys-color-surfaceContainerHigh)"}}><PowerProfileTable powers={getKarmaPowerLoadout(characterSheetFields.karmaSpecialty, characterSheetFields.study)}
                                                                                                                               readOnly/></Paper> :
                                    <Box><Typography variant={"h2"}>Select a Karma Study to view Karma Powers!</Typography></Box>}
                            </div>
                            <div>
                                <TypographyWithAdornment text={"Traits & Flaws"}/>
                                <Paper style={{background: "var(--md-sys-color-surfaceContainerHigh)"}}><TraitAndFlawTable inPlay/></Paper>
                            </div>
                        </Stack>
                    </Grid>
                    <Grid size={{md: 3}} style={{marginTop: 8}}>
                        <Stack spacing={2}>
                            <TextField
                                label="Study"
                                variant={"outlined"}
                                value={characterSheetFields.study}
                                fullWidth
                                slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }}/>
                            <TextField
                                label="Level"
                                variant={"outlined"}
                                value={characterSheetFields.level}
                                fullWidth
                                onKeyDown={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                onChange={(e) => characterSheetFields.setLevel(Math.max(1, Number(e.target.value)))}
                                type={"number"}
                            />
                            <div>
                                <TypographyWithAdornment text={"Gear of Destiny"}/>
                                <img src={characterSheetFields.gearOfDestinyURL} style={{width: '100%'}}/>
                            </div>
                            <div>
                                <TypographyWithAdornment text={"Karma Pool"}/>
                                <Paper style={shadedBoxStyle}>
                                    <Grid container spacing={1}>
                                        <Grid size={{md: 6}}>
                                            <TextField fullWidth
                                                       onKeyDown={(event) => {
                                                           if (!/[0-9]/.test(event.key)) {
                                                               event.preventDefault();
                                                           }
                                                       }}
                                                       onChange={(e) => characterSheetFields.setKarmaPool(Math.max(0, Number(e.target.value)))}
                                                       variant={"outlined"}
                                                       type={"number"}
                                                       slotProps={{
                                                           input: {
                                                               endAdornment: (
                                                                   <InputAdornment position="end">
                                                                       / {characterSheetFields.karmaSpecialty ? getMaxKarma(characterSheetFields.karmaSpecialty, characterSheetFields.level) : 0}
                                                                   </InputAdornment>
                                                               ),
                                                           },
                                                       }}
                                                       value={characterSheetFields.karmaPool}
                                                       label={"Karma Pool"}/>
                                        </Grid>
                                        <Grid size={{md: 6}}>
                                            {/*TODO Find a way to fit /100 into the textfield*/}
                                            <TextField fullWidth
                                                       onKeyPress={(event) => {
                                                           if (!/[0-9]/.test(event.key)) {
                                                               event.preventDefault();
                                                           }
                                                       }}
                                                       onChange={(e) => characterSheetFields.setPaybackPoints(Math.max(0, Number(e.target.value)))}
                                                       variant={"outlined"}
                                                       type={"number"}
                                                       value={characterSheetFields.paybackPoints}
                                                       slotProps={{
                                                           input: {
                                                               startAdornment: (
                                                                   <InputAdornment position="start">
                                                                       {characterSheetFields.paybackPoints >= 50 ? <Warning/> : <Check/>}
                                                                   </InputAdornment>
                                                               ),
                                                           },
                                                       }}
                                                       label={"Payback"}/>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </div>
                            <TextField label={'Items'} multiline value={characterSheetFields.items} onChange={event => characterSheetFields.setItems(event.target.value)}/>
                            <TextField label={'Other Learned Skills and Techniques'} multiline value={characterSheetFields.otherSkills} onChange={event => characterSheetFields.setOtherSkills(event.target.value)}/>
                            {!printMode && <Button variant={"outlined"} color={"tertiary"} onClick={() => printCharacterSheet()}>Print</Button>}
                        </Stack>
                    </Grid>
                </Grid>
                <TypographyWithAdornment text={"Skill Tree"}/>
                <SkillTree readOnly/>
            </Container>
            {/*TODO Make this mobile compatible by putting this on the bottom*/}
            <div style={{marginTop: 16, marginRight: 16}}>
                <ModeToggle/>
            </div>
        </div>
    </Fade>;
}