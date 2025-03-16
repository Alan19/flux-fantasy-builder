import {Affiliation} from "./KarmaSpecialty.ts";

export interface Trait {
    description: string;
    effect: string;
}

export type TraitList = "Dependable" | "Good Looking" | "Handy" | "Determined" | "Calm" | "Talented" | "Loyal" | "Inspirational" | "Honorable" | "Spunky" | "Protective" | "Thrifty" | "Observant" | "Adaptable" | "Resilient"
export type FlawList = "Hot Headed" | "Insecure" | "Tongue Tied" | "Arrogant" | "Reckless" | "Selfish" | "Unmotivated" | "Clumsy" | "Paranoid" | "Cowardly" | "Secretive" | "Lovesick" | "Distracted" | "Extravagant" | "Distant"

export const selectableTraits: Record<TraitList, Trait> = {
    Dependable: {description: "People rely upon and look up to you.", effect: "Ability to perform Combos at -2 KP cost."},
    "Good Looking": {description: "Hey there, handsome!", effect: "+2 to Aura rolls when the initial roll is lower than 10."},
    Handy: {description: "You're good at fixing things.", effect: "Pass 3 Technique Checks without rolling per session."},
    Determined: {description: "You won't let anything stop you!", effect: "Trade a Quick Action for another Turn of Movement in combat."},
    Calm: {description: "You're cool under pressure.", effect: "Gain one Quick Action per Turn in combat."},
    Talented: {description: "Wow, you're a natural at this!", effect: "Gain +1 Modifier to any one Talent under 3."},
    Loyal: {description: "You stick by those you care about.", effect: "Ability to share Med+ Kits effects with one other player."},
    Inspirational: {description: "You always know how to bring others up.", effect: "Add your Modifier to another Player's Talent roll twice per game."},
    Honorable: {description: "You do the right thing.", effect: "Common-uncommon items with one time use now have two uses for you."},
    Spunky: {description: "You've got a lot of energy.", effect: "Gain ⧗5 for every natural 20 roll."},
    Protective: {description: "You're always defending others.", effect: "+2 Defense when performing a Defense move in combat."},
    Adaptable: {description: "It's a good thing you're flexible.", effect: "When failing a Basic Action roll, reroll 2 times per Checkpoint."},
    Resilient: {description: "You're tough.", effect: "Gain +1 Destiny Rewrite per Checkpoint."},
    Thrifty: {description: "You're always finding a good deal.", effect: "Gain an additional +⧗5 when finding merits"},
    Observant: {description: "Great eye!", effect: "+2 to Function rolls when the initial roll is lower than 10."}
}
export const selectableFlaws: Record<FlawList, Trait> = {
    "Hot Headed": {description: "You get too worked up too quickly.", effect: "Lose your first Turn at the start of battle."},
    Insecure: {description: "You're not sure if you're doing things right.", effect: "-2 to Cooldown rolls for karma recharging"},
    "Tongue Tied": {description: "Oops, you said the wrong thing again.", effect: "-1 to Aura rolls."},
    Arrogant: {description: "You think you're all that, huh?", effect: "When rolling for Willpower, roll twice and take the lower of two rolls before adding your modifier."},
    Reckless: {description: "Rushed into a things and made a mess again.", effect: "Basic Attacks are -2 damage."},
    Selfish: {description: "MINE. MINE. MINE.", effect: "When shopping, prices are +10 for all items."},
    Unmotivated: {description: "You don't really care.", effect: "-1 to all Agility rolls"},
    Clumsy: {description: "Where did I put that?", effect: "Only carry up to 10 items at a time."},
    Paranoid: {description: "Someone is watching me!", effect: "Basic Defense powers cost +5 KP to perform."},
    Cowardly: {description: "You're not one to rush into battle.", effect: "When rolling for Initiative in combat, -5"},
    Secretive: {description: "You don't trust anyone.", effect: "Can't share items with others."},
    Lovesick: {description: "You fall in love with everyone you meet.", effect: "When rolling for Aura, roll twice and take the lower result."},
    Distracted: {description: "Huh? What did you say?", effect: "On rolls requiring multiple people to succeed, subtract 2 from your roll result."},
    Extravagant: {description: "You have expensive taste.", effect: "Items cost +⧗5 merits more than listed."},
    Distant: {description: "You keep others at a distance.", effect: "Can only perform one Combo per combat."}
}

export const affiliationTraits: Record<Affiliation, { name: string, effect: string }> = {
    "Wolfgang Academy": {
        name: "Student",
        effect: "Any Technique or Willpower roll, roll 2 dice and take the better of the two rolls."
    },
    "Great Escape Artist Society": {
        name: "Social Butterfly",
        effect: "Combos take 5 less KP."
    },
    "National Karmastry Authority": {
        name: "Full Assault",
        effect: "Ability to attack 3 times per combat without raising the danger or Payback Level."
    },
    "Clockbot Union": {
        name: "Bot Lover",
        effect: "+3 Aura when communicating with bots."
    },
    Independent: {
        name: "Tough Guy",
        effect: "All attacks +3 Damage."
    },
    "Ink Fighting Elite": {
        name: "Get Back Up",
        effect: "When below 25% HP, add +3 to all rolls."
    },
    [Affiliation.foreignVisitor]: {
        name: "Diplomatic Immunity",
        effect: "+4 Damage on all attacks when fighting against Special Agents"
    }
}

export const affiliationFlaws: Record<Affiliation, { name: string, effect: string }> = {
    "Wolfgang Academy": {
        name: "Still Learning",
        effect: "All karma attacks cost 3 more KP."
    },
    "National Karmastry Authority": {
        name: "Disliked",
        effect: "Any Aura roll -2 before adding your Modifier."
    },
    "Great Escape Artist Society": {
        name: "Elitist",
        effect: "Can't perform combos with Special Agents or Ink Fighter Elites."
    },
    "Clockbot Union": {
        name: "Socially Awkward",
        effect: "-3 Aura when speaking with humans."
    },
    Independent: {
        name: "Loner",
        effect: "Can't perform combos."
    },
    "Ink Fighting Elite": {
        name: "Bruised",
        effect: "-1 to Function rolls."
    },
    [Affiliation.foreignVisitor]: {
        name: "Language Barrier",
        effect: "-1 to Technique"
    }
}