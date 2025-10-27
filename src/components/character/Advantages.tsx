import {KarmaSpecialty} from "../../utils/types/KarmaSpecialty.ts";

export function Advantages({karmaSpecialty, level}: { karmaSpecialty: KarmaSpecialty, level: number }) {
    let advantages: string[] = [];
    switch (karmaSpecialty) {
        case KarmaSpecialty.escapeArtist:
            advantages = ["Escape Artists can replenish 10 KP when completely depleted in battle"]
            break
        case KarmaSpecialty.clockbot:
            advantages = ["Can absorb 50% of payback and karma-weapon attacks without taking damage, halving all potential damage"]
            break
        case KarmaSpecialty.inkFighter:
            advantages = ["Can trade Movement for an extra action in combat"]
            break
        case KarmaSpecialty.specialAgent:
            advantages = ["Receive 10% of their current merit balance as a government-approved bonus and an extra Med+ Kit after each checkpoint"]
            break
    }
    advantages = [...advantages, "+5 to Karma Pool", "+10 HP Boost", "Extra Skill Tree Point", "+1 to any Talent", "10% Discount in all Shops", "+1 to DEF", "+1 to DEF", "All one-time items can be used twice", "+10 to Karma Pool"]

    return <>
        <h5>Advantages</h5>
        {advantages.slice(0, level).map(value => <div>• {value}</div>)}
    </>;
}