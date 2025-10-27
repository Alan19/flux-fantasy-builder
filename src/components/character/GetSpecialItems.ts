import {KarmaSpecialty} from "../../utils/types/KarmaSpecialty.ts";

export function getSpecialItems(karmaSpecialty: KarmaSpecialty) {
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