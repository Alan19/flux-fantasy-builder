import {AdvancedSwapPowerChoice, BasicSwapPowerChoice, getPowerCost, getTierName, indexToAdvancedSwapPower, indexToBasicSwapPower, isPowerTierSwapPower, PowerTier, PowerType, SwapPower} from "../../utils/types/usePowerLoadoutSettings.ts";
import {KarmaPowersGettersAndSetters} from "../../utils/AssembleLocalStorage.ts";
import {BeerCSSRadio} from "../ui/beer-css-wrappers/BeerCSSRadio.tsx";
import {KarmaSkills, PersonalitySkills, SkillName} from "../skills/SkillTreeInfo.ts";
import {Study} from "../../utils/types/KarmaSpecialty.ts";
import {locomotionCosts, locomotionRanges} from "../../utils/types/KarmaPowerLoadout.ts";
import {BeerCSSSelect} from "../ui/beer-css-wrappers/BeerCSSSelect.tsx";
import {KarmaPowerRow} from "./KarmaPowerRow.tsx";
import {getKarmaPowerStatsForStudy} from "../../utils/karma-powers/getKarmaPowerStatsForStudy.ts";


function isPowerTierUnlocked(tier: PowerTier, skills: SkillName[]) {
    switch (tier) {
        case PowerTier.Basic:
            return true;
        case PowerTier["Basic 2"]:
            return skills.includes(KarmaSkills.tier2BasicAttacks);
        case PowerTier.Advanced:
            return skills.includes(KarmaSkills.advancedAttacks);
        case PowerTier["Advanced 2"]:
            return skills.includes(KarmaSkills.advancedAttacks2)
    }
}

// TODO Add warning if you don't have the appropriate skill for higher level karma powers
export function KarmaPowerTable(props: Readonly<{ karmaPowerLoadout: KarmaPowersGettersAndSetters, skills: SkillName[], study: Study, isOverPaybackThreshold: boolean, displayMode: "select" | "edit" | "basic" }>) {
    const {karmaPowerLoadout: powers, skills, isOverPaybackThreshold, study, displayMode} = props;

    const [swapPowerOptions, karmaPowerStats] = getKarmaPowerStatsForStudy(study);

    function karmaPowerCostHelper(powerType: PowerType, powerTier: PowerTier) {
        let baseCostArray;
        switch (powerType) {
            case PowerType.attack:
            case PowerType.defense:
                baseCostArray = karmaPowerStats.costs.attackAndDefense;
                break;
            case PowerType.combo:
                baseCostArray = karmaPowerStats.costs.combo;
                break;
            case PowerType.signature:
                baseCostArray = karmaPowerStats.costs.signature;
                break;
            default:
                baseCostArray = locomotionCosts;
                break;
        }
        return getPowerCost(baseCostArray[powerTier], props.isOverPaybackThreshold, powerType === PowerType.combo, skills.includes(PersonalitySkills.combo2), skills.includes(PersonalitySkills.combo3))
    }

    function getAttackStats(tier: PowerTier | SwapPower): { damage: number; range: string; effect?: string } {
        switch (+tier) {
            case PowerTier.Basic:
            case PowerTier["Basic 2"]:
            case PowerTier.Advanced:
            case PowerTier["Advanced 2"]:
                return {damage: karmaPowerStats.attack.damage[tier as PowerTier], range: karmaPowerStats.attack.range[tier as PowerTier], effect: karmaPowerStats.effects[tier as PowerTier]}
            case BasicSwapPowerChoice.A:
            case BasicSwapPowerChoice.B:
            case BasicSwapPowerChoice.C:
                return {damage: swapPowerOptions.setup[tier - 4].damage, range: swapPowerOptions.setup[tier - 4].range, effect: swapPowerOptions.setup[tier - 4].effect}
            case AdvancedSwapPowerChoice.D:
            case AdvancedSwapPowerChoice.E:
            case AdvancedSwapPowerChoice.F:
                return {damage: swapPowerOptions.advanced[tier - 7].damage, range: swapPowerOptions.advanced[tier - 7].range, effect: swapPowerOptions.advanced[tier - 7].effect}
            default:
                return {damage: 0, range: "Error"}
        }
    }

    const {damage: selectedAttackDamage, range: selectedAttackRange, effect: selectedAttackEffect} = getAttackStats(props.karmaPowerLoadout.selectedAttackTier[0])

    return <div>
        <table className={"border"}>
            <thead>
            <tr className={'primary-container'}>
                <th>Basic Powers</th>
                <th align="right">Cost</th>
                <th align="right">Damage</th>
                <th align="right">Range</th>
                <th align="right">Effect</th>
            </tr>
            </thead>
            <tbody>

            {displayMode === "select" ? <>
                <tr>
                    <td style={{paddingTop: 10}}>
                        <BeerCSSSelect label={"Selected Attack"}
                                       onChange={event => props.karmaPowerLoadout.selectedAttackTier[1](event.target.value as unknown as PowerTier | SwapPower)}
                                       value={props.karmaPowerLoadout.selectedAttackTier[0]}
                                       inputSize={"small"}
                        >
                            {<option value={props.karmaPowerLoadout.selectedSwapPower[0]}>{swapPowerOptions.setup[props.karmaPowerLoadout.selectedSwapPower[0] - 4].name}</option>}
                            {<option value={props.karmaPowerLoadout.selectedAdvancedSwapPower[0]} disabled={!skills.includes(KarmaSkills.advancedAttacks)}>{swapPowerOptions.advanced[props.karmaPowerLoadout.selectedAdvancedSwapPower[0] - 7].name}</option>}
                            {[powers.basicAttack[0], powers.basic2Attack[0], powers.advancedAttack[0], powers.advanced2Attack[0]].map((value, index) => <option disabled={!isPowerTierUnlocked(index, skills)} key={`${getTierName(index)} Attack`} value={index}>{value || `Unnamed ${getTierName(index)} Attack`}</option>)}
                        </BeerCSSSelect>
                    </td>
                    <td align="right">
                        {!isPowerTierSwapPower(props.karmaPowerLoadout.selectedAttackTier[0]) && karmaPowerCostHelper(PowerType.attack, props.karmaPowerLoadout.selectedAttackTier[0])}{isOverPaybackThreshold && "(⬆)"}
                    </td>
                    <td align="right">{selectedAttackDamage}</td>
                    <td align="right">{selectedAttackRange}</td>
                    <td>{selectedAttackEffect}</td>
                </tr>
                <tr>
                    <td style={{paddingTop: 10}}>
                        <BeerCSSSelect label={"Selected Defense"}
                                       onChange={event => props.karmaPowerLoadout.selectedDefenseTier[1](event.target.value as unknown as PowerTier)}
                                       value={props.karmaPowerLoadout.selectedDefenseTier[0]}
                                       inputSize={"small"}
                        >
                            {[powers.basicDefense[0], powers.basic2Defense[0], powers.advancedDefense[0], powers.advanced2Defense[0]].map((value, index) => <option disabled={!isPowerTierUnlocked(index, skills)} key={`${getTierName(index)} Defense`} value={index}>{value || `Unnamed ${getTierName(index)} Defense`}</option>)}
                        </BeerCSSSelect>
                    </td>
                    <td align="right">
                        {karmaPowerCostHelper(PowerType.defense, props.karmaPowerLoadout.selectedDefenseTier[0])}{isOverPaybackThreshold && "(⬆)"}
                    </td>
                    <td align="right"></td>
                    <td align="right"></td>
                    <td>+{karmaPowerStats.defense.effect[props.karmaPowerLoadout.selectedDefenseTier[0]]} to DEF on next turn</td>
                </tr>
                <tr>
                    <td style={{paddingTop: 10}}>
                        <BeerCSSSelect label={"Selected Combo"}
                                       onChange={event => props.karmaPowerLoadout.selectedComboTier[1](event.target.value as unknown as PowerTier)}
                                       value={props.karmaPowerLoadout.selectedComboTier[0]}
                                       inputSize={"small"}
                        >
                            {[powers.basicCombo[0], powers.basic2Combo[0], powers.advancedCombo[0], powers.advanced2Combo[0]].map((value, index) => <option disabled={!isPowerTierUnlocked(index, skills)} key={`${getTierName(index)} Combo`} value={index}>{value || `Unnamed ${getTierName(index)} Combo`}</option>)}
                        </BeerCSSSelect>
                    </td>
                    <td align="right">
                        {karmaPowerCostHelper(PowerType.combo, props.karmaPowerLoadout.selectedComboTier[0])}{isOverPaybackThreshold && "(⬆)"}
                    </td>
                    <td align="right">{karmaPowerStats.combo.damage[props.karmaPowerLoadout.selectedComboTier[0]]}</td>
                    <td align="right">{karmaPowerStats.combo.range[props.karmaPowerLoadout.selectedComboTier[0]]}</td>
                    <td>{karmaPowerStats.effects[props.karmaPowerLoadout.selectedComboTier[0]]}</td>
                </tr>
                <tr>
                    <td style={{paddingTop: 10}}>
                        <BeerCSSSelect label={"Selected Combo"}
                                       onChange={event => props.karmaPowerLoadout.selectedSignatureTier[1](event.target.value as unknown as PowerTier)}
                                       value={props.karmaPowerLoadout.selectedSignatureTier[0]}
                                       inputSize={"small"}
                        >
                            {[powers.basicSignature[0], powers.basic2Signature[0], powers.advancedSignature[0], powers.advanced2Signature[0]].map((value, index) => <option disabled={!isPowerTierUnlocked(index, skills)} key={`${getTierName(index)} Signature`} value={index}>{value || `Unnamed ${getTierName(index)} Signature`}</option>)}
                        </BeerCSSSelect>
                    </td>
                    <td align="right">
                        {karmaPowerCostHelper(PowerType.signature, props.karmaPowerLoadout.selectedSignatureTier[0])}{isOverPaybackThreshold && "(⬆)"}
                    </td>
                    <td align="right">{karmaPowerStats.signature.damage[props.karmaPowerLoadout.selectedSignatureTier[0]]}</td>
                    <td align="right">{karmaPowerStats.signature.range[props.karmaPowerLoadout.selectedSignatureTier[0]]}</td>
                    <td>{karmaPowerStats.effects[props.karmaPowerLoadout.selectedSignatureTier[0]]}</td>
                </tr>
                <tr>
                    <td style={{paddingTop: 10}}>
                        <BeerCSSSelect label={"Selected Locomotion"}
                                       onChange={event => props.karmaPowerLoadout.selectedLocomotionTier[1](event.target.value as unknown as PowerTier)}
                                       value={props.karmaPowerLoadout.selectedLocomotionTier[0]}
                                       inputSize={"small"}
                        >
                            {[powers.basicLocomotion[0], powers.basic2Locomotion[0], powers.advancedLocomotion[0], powers.advanced2Locomotion[0]].map((value, index) => <option disabled={!isPowerTierUnlocked(index, skills)} key={`${getTierName(index)} Locomotion`} value={index}>{value || `Unnamed ${getTierName(index)} Locomotion`}</option>)}
                        </BeerCSSSelect>
                    </td>
                    <td align="right">
                        {karmaPowerCostHelper(PowerType.locomotion, props.karmaPowerLoadout.selectedLocomotionTier[0])}{isOverPaybackThreshold && "(⬆)"}
                    </td>
                    <td align="right"></td>
                    <td align="right"></td>
                    <td>+{locomotionRanges[props.karmaPowerLoadout.selectedLocomotionTier[0]]} MOV</td>
                </tr>
            </> : <>
                <KarmaPowerRow powerName={powers.basicAttack[0]}
                               onChange={event => powers.basicAttack[1](event.target.value)}
                               label={"Basic Attack"}
                               damage={karmaPowerStats.attack.damage[0]}
                               range={karmaPowerStats.attack.range[0]}
                               cost={karmaPowerCostHelper(PowerType.attack, PowerTier.Basic)}
                               effect={karmaPowerStats.effects[0]}
                               isOverPaybackThreshold={isOverPaybackThreshold}/>
                <KarmaPowerRow powerName={powers.basicDefense[0]}
                               onChange={event => powers.basicDefense[1](event.target.value)}
                               label={"Basic Defense"}
                               cost={karmaPowerCostHelper(PowerType.defense, PowerTier.Basic)}
                               isOverPaybackThreshold={isOverPaybackThreshold}
                               effect={`+${karmaPowerStats.defense.effect[0]} to DEF on next turn`}/>
                <KarmaPowerRow powerName={powers.basicCombo[0]}
                               onChange={event => powers.basicCombo[1](event.target.value)}
                               label={"Basic Combo"}
                               cost={karmaPowerCostHelper(PowerType.combo, PowerTier.Basic)}
                               damage={karmaPowerStats.combo.damage[0]}
                               range={karmaPowerStats.combo.range[0]}
                               effect={karmaPowerStats.effects[0]}
                               isOverPaybackThreshold={isOverPaybackThreshold}/>
                <KarmaPowerRow powerName={powers.basicSignature[0]}
                               onChange={event => powers.basicSignature[1](event.target.value)}
                               label={"Basic Signature"}
                               cost={karmaPowerCostHelper(PowerType.signature, PowerTier.Basic)}
                               damage={karmaPowerStats.signature.damage[0]}
                               range={karmaPowerStats.signature.range[0]}
                               effect={karmaPowerStats.effects[0]}
                               isOverPaybackThreshold={isOverPaybackThreshold}/>
                <KarmaPowerRow powerName={powers.basicLocomotion[0]}
                               onChange={event => powers.basicLocomotion[1](event.target.value)}
                               label={"Basic Locomotion"}
                               cost={karmaPowerCostHelper(PowerType.locomotion, PowerTier.Basic)}
                               effect={`+${locomotionRanges[0]} MOV`}
                               isOverPaybackThreshold={isOverPaybackThreshold}/>
                <tr className={'secondary-container'}>
                    <th>Basic Swap Powers</th>
                    <th align="right"></th>
                    <th align="right"></th>
                    <th align="right"></th>
                    <th align="right"></th>
                </tr>
                {swapPowerOptions.setup.map((value, index) => {
                    const basicSwapPowerOption: BasicSwapPowerChoice = indexToBasicSwapPower(index as 0 | 1 | 2)
                    const [selectedSwapPower, setSelectedSwapPower] = powers.selectedSwapPower;
                    return <tr key={value.name}>
                        <td>
                            <BeerCSSRadio value={value.name}
                                          onChange={() => setSelectedSwapPower(basicSwapPowerOption)}
                                          checked={selectedSwapPower === basicSwapPowerOption}
                                          label={value.name}/>
                        </td>
                        <td></td>
                        <td align={"right"}>{value.damage}</td>
                        <td align={"right"}>{value.range}</td>
                        <td align={"right"}>{value.effect}</td>
                    </tr>;
                })}
            </>}


            {displayMode === "edit" && <>
                <tr className={'primary-container'}>
                    <th>Basic Tier 2 Powers</th>
                    <th align="right">Cost</th>
                    <th align="right">Damage</th>
                    <th align="right">Range</th>
                    <th align="right">Effect</th>
                </tr>
                <KarmaPowerRow powerName={powers.basic2Attack[0]}
                               onChange={event => powers.basic2Attack[1](event.target.value)}
                               label={"Tier 2 Basic Attack"}
                               damage={karmaPowerStats.attack.damage[1]}
                               range={karmaPowerStats.attack.range[1]}
                               cost={karmaPowerCostHelper(PowerType.attack, PowerTier["Basic 2"])}
                               effect={karmaPowerStats.effects[1]}
                               isOverPaybackThreshold={isOverPaybackThreshold}/>
                <KarmaPowerRow powerName={powers.basic2Defense[0]}
                               onChange={event => powers.basic2Defense[1](event.target.value)}
                               label={"Tier 2 Basic Defense"}
                               cost={karmaPowerCostHelper(PowerType.defense, PowerTier["Basic 2"])}
                               isOverPaybackThreshold={isOverPaybackThreshold}
                               effect={`+${karmaPowerStats.defense.effect[1]} to DEF on next turn`}/>
                <KarmaPowerRow powerName={powers.basic2Combo[0]}
                               onChange={event => powers.basic2Combo[1](event.target.value)}
                               label={"Tier 2 Basic Combo"}
                               cost={karmaPowerCostHelper(PowerType.combo, PowerTier["Basic 2"])}
                               damage={karmaPowerStats.combo.damage[1]}
                               range={karmaPowerStats.combo.range[1]}
                               effect={karmaPowerStats.effects[1]}
                               isOverPaybackThreshold={isOverPaybackThreshold}/>
                <KarmaPowerRow powerName={powers.basic2Signature[0]}
                               onChange={event => powers.basic2Signature[1](event.target.value)}
                               label={"Tier 2 Basic Signature"}
                               cost={karmaPowerCostHelper(PowerType.signature, PowerTier["Basic 2"])}
                               damage={karmaPowerStats.signature.damage[1]}
                               range={karmaPowerStats.signature.range[1]}
                               effect={karmaPowerStats.effects[1]}
                               isOverPaybackThreshold={isOverPaybackThreshold}/>
                <KarmaPowerRow powerName={powers.basic2Locomotion[0]}
                               onChange={event => powers.basic2Locomotion[1](event.target.value)}
                               label={"Tier 2 Basic Locomotion"}
                               cost={karmaPowerCostHelper(PowerType.locomotion, PowerTier["Basic 2"])}
                               effect={`+${locomotionRanges[1]} MOV`}
                               isOverPaybackThreshold={isOverPaybackThreshold}/>
                <tr className={'primary-container'}>
                    <th>Advanced Powers</th>
                    <th align="right">Cost</th>
                    <th align="right">Damage</th>
                    <th align="right">Range</th>
                    <th align="right">Effect</th>
                </tr>
                <KarmaPowerRow powerName={powers.advancedAttack[0]}
                               onChange={event => powers.advancedAttack[1](event.target.value)}
                               label={"Advanced Attack"}
                               damage={karmaPowerStats.attack.damage[2]}
                               range={karmaPowerStats.attack.range[2]}
                               cost={karmaPowerCostHelper(PowerType.attack, PowerTier.Advanced)}
                               effect={karmaPowerStats.effects[2]}
                               isOverPaybackThreshold={isOverPaybackThreshold}/>
                <KarmaPowerRow powerName={powers.advancedDefense[0]}
                               onChange={event => powers.advancedDefense[1](event.target.value)}
                               label={"Advanced Defense"}
                               cost={karmaPowerCostHelper(PowerType.defense, PowerTier.Advanced)}
                               isOverPaybackThreshold={isOverPaybackThreshold}
                               effect={`+${karmaPowerStats.defense.effect[2]} to DEF on next turn`}/>
                <KarmaPowerRow powerName={powers.advancedCombo[0]}
                               onChange={event => powers.advancedCombo[1](event.target.value)}
                               label={"Tier 2 Basic Combo"}
                               cost={karmaPowerCostHelper(PowerType.combo, PowerTier.Advanced)}
                               damage={karmaPowerStats.combo.damage[2]}
                               range={karmaPowerStats.combo.range[2]}
                               effect={karmaPowerStats.effects[2]}
                               isOverPaybackThreshold={isOverPaybackThreshold}/>
                <KarmaPowerRow powerName={powers.advancedSignature[0]}
                               onChange={event => powers.advancedSignature[1](event.target.value)}
                               label={"Advanced Signature"}
                               cost={karmaPowerCostHelper(PowerType.signature, PowerTier.Advanced)}
                               damage={karmaPowerStats.signature.damage[2]}
                               range={karmaPowerStats.signature.range[2]}
                               effect={karmaPowerStats.effects[2]}
                               isOverPaybackThreshold={isOverPaybackThreshold}/>
                <KarmaPowerRow powerName={powers.advancedLocomotion[0]}
                               onChange={event => powers.advancedLocomotion[1](event.target.value)}
                               label={"Advanced Locomotion"}
                               cost={karmaPowerCostHelper(PowerType.locomotion, PowerTier.Advanced)}
                               effect={`+${locomotionRanges[2]} MOV`}
                               isOverPaybackThreshold={isOverPaybackThreshold}/>
                <tr className={'secondary-container'}>
                    <th>Advanced Swap Powers</th>
                    <th align="right"></th>
                    <th align="right">Damage</th>
                    <th align="right">Range</th>
                    <th align="right">Effect</th>
                </tr>

                {swapPowerOptions.advanced.map((value, index) => {
                    const advancedSwapPowerOption: AdvancedSwapPowerChoice = indexToAdvancedSwapPower(index as 0 | 1 | 2)
                    const [selectedAdvancedSwapPower, setSelectedAdvancedSwapPower] = powers.selectedAdvancedSwapPower;
                    return <tr key={value.name}>
                        <td>
                            <BeerCSSRadio value={value.name}
                                          onChange={() => setSelectedAdvancedSwapPower(advancedSwapPowerOption)}
                                          checked={selectedAdvancedSwapPower === advancedSwapPowerOption}
                                          label={value.name}/>
                        </td>
                        <td></td>
                        <td align={"right"}>{value.damage}</td>
                        <td align={"right"}>{value.range}</td>
                        <td align={"right"}>{value.effect}</td>
                    </tr>;
                })}

                <tr className={'primary-container'}>
                    <th>Advanced Tier 2 Powers</th>
                    <th align="right">Cost</th>
                    <th align="right">Damage</th>
                    <th align="right">Range</th>
                    <th align="right">Effect</th>
                </tr>
                <KarmaPowerRow powerName={powers.advanced2Attack[0]}
                               onChange={event => powers.advanced2Attack[1](event.target.value)}
                               label={"Tier 2 Advanced Attack"}
                               damage={karmaPowerStats.attack.damage[3]}
                               range={karmaPowerStats.attack.range[3]}
                               cost={karmaPowerCostHelper(PowerType.attack, PowerTier["Advanced 2"])}
                               effect={karmaPowerStats.effects[2]}
                               isOverPaybackThreshold={isOverPaybackThreshold}/>
                <KarmaPowerRow powerName={powers.advanced2Defense[0]}
                               onChange={event => powers.advanced2Defense[1](event.target.value)}
                               label={"Tier 2 Advanced Defense"}
                               cost={karmaPowerCostHelper(PowerType.defense, PowerTier["Advanced 2"])}
                               isOverPaybackThreshold={isOverPaybackThreshold}
                               effect={`+${karmaPowerStats.defense.effect[3]} to DEF on next turn`}/>
                <KarmaPowerRow powerName={powers.advanced2Combo[0]}
                               onChange={event => powers.advanced2Combo[1](event.target.value)}
                               label={"Tier 2 Advanced Combo"}
                               cost={karmaPowerCostHelper(PowerType.combo, PowerTier["Advanced 2"])}
                               damage={karmaPowerStats.combo.damage[3]}
                               range={karmaPowerStats.combo.range[3]}
                               effect={karmaPowerStats.effects[3]}
                               isOverPaybackThreshold={isOverPaybackThreshold}/>
                <KarmaPowerRow powerName={powers.advanced2Signature[0]}
                               onChange={event => powers.advanced2Signature[1](event.target.value)}
                               label={"Advanced Tier 2 Signature"}
                               cost={karmaPowerCostHelper(PowerType.signature, PowerTier["Advanced 2"])}
                               damage={karmaPowerStats.signature.damage[3]}
                               range={karmaPowerStats.signature.range[3]}
                               effect={karmaPowerStats.effects[3]}
                               isOverPaybackThreshold={isOverPaybackThreshold}/>
                <KarmaPowerRow powerName={powers.advanced2Locomotion[0]}
                               onChange={event => powers.advanced2Locomotion[1](event.target.value)}
                               label={"Advanced Tier 2 Locomotion"}
                               cost={karmaPowerCostHelper(PowerType.locomotion, PowerTier["Advanced 2"])}
                               effect={`+${locomotionRanges[3]} MOV`}
                               isOverPaybackThreshold={isOverPaybackThreshold}/>
            </>}
            </tbody>
        </table>
    </div>
}