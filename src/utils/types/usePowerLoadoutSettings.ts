export enum PowerType {
    attack = "attack",
    defense = "defense",
    combo = "combo",
    signature = "signature",
    locomotion = "locomotion",
}

export enum PowerTier {
    Basic,
    "Basic 2",
    Advanced,
    "Advanced 2"
}

export enum BasicSwapPowerChoice {
    A = 4, B, C
}

export enum AdvancedSwapPowerChoice {
    D = 7, E, F
}

export function indexToBasicSwapPower(val: 0 | 1 | 2): BasicSwapPowerChoice {
    switch (val) {
        case 0:
            return BasicSwapPowerChoice.A;
        case 1:
            return BasicSwapPowerChoice.B;
        case 2:
            return BasicSwapPowerChoice.C;
    }
}

export function indexToAdvancedSwapPower(val: 0 | 1 | 2) {
    switch (val) {
        case 0:
            return AdvancedSwapPowerChoice.D;
        case 1:
            return AdvancedSwapPowerChoice.E;
        case 2:
            return AdvancedSwapPowerChoice.F;
    }
}

export type SwapPower = BasicSwapPowerChoice | AdvancedSwapPowerChoice

export function getPowerCost(baseCost: number, isOverPaybackThreshold: boolean, isCombo = false, combo2Unlocked = false, combo3Unlocked = false) {
    let cost = baseCost;
    if (isOverPaybackThreshold) {
        cost += 2;
    }
    if (isCombo && combo2Unlocked) {
        cost -= 10
    }
    if (isCombo && combo3Unlocked) {
        cost -= 5
    }
    return Math.max(cost, 0);
}

export function getTierName(power: PowerTier | string) {
// TODO Add label for advanced swap power
    if (typeof power === 'string') {
        return "Swap Power"
    }
    switch (power) {
        case PowerTier.Basic:
            return "Basic"
        case PowerTier["Basic 2"]:
            return "Basic Tier 2"
        case PowerTier.Advanced:
            return "Advanced"
        case PowerTier["Advanced 2"]:
            return "Advanced Tier 2"
    }
}

export function isPowerTierSwapPower(power: PowerTier | SwapPower): power is SwapPower {
    return power > 3;
}