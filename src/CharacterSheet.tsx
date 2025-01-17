import React, {useState} from "react";

type KarmaSpecialty = 'Escape Artist' | 'Ink Fighter' | 'Special Agent' | 'Clockbot';
type EscapeArtistStudies = 'Creative Karmastry' | 'Clockwork Karmastry' | 'Bio Karmastry' | 'Machine Karmastry' | 'Quantum Karmastry';
type InkFighterStudies = 'Melee' | 'Projectile' | 'Animal' | 'Body' | 'Elemental'
type SpecialAgentStudies = 'Scout' | 'Disrupter' | 'Bodyguard' | 'Operative' | 'Tinker'
type ClockbotStudies = 'Decoy' | 'Karmastry-Assist' | 'Medical' | 'Heavy' | 'Experimental'
type Study = EscapeArtistStudies | InkFighterStudies | SpecialAgentStudies | ClockbotStudies;

export const CharacterSheet = () => {
    const [playerName, setPlayerName] = useState<string>('')
    const [characterName, setCharacterName] = useState<string>('')
    const [age, setAge] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    const [height, setHeight] = useState<string>('')
    const [weight, setWeight] = useState<string>('')
    const [karmaSpecialty, setKarmaSpecialty] = useState<KarmaSpecialty>()
    const [affiliation, setAffiliation] = useState<'Wolfgang Academy' | 'Great Escape Artist Society' | 'Ink Fighting Elite' | 'National Karmastry Authority' | 'Clockbot Union' | 'Independent'>()

    const [study, setStudy] = useState<Study>()
    const [level, setLevel] = useState(1)
    const [aura, setAura] = useState<number>()
    const [technique, setTechnique] = useState<number>()
    const [stamina, setStamina] = useState<number>()
    const [functionStat, setFunction] = useState<number>()
    const [willpower, setWillpower] = useState<number>()
    const [agility, setAgility] = useState<number>()
    return (
        <Container>
            <HStack gap="10" width="full">
                <Field label="Player Name" required>
                    <Input placeholder="me@example.com" variant="subtle" />
                </Field>
                <Field label="Email" required>
                    <Input placeholder="me@example.com" variant="outline" />
                </Field>
            </HStack>
            Player Name: <textarea value={playerName} onChange={(e) => setPlayerName(e.target.value)}/>
        </Container>
    );
};