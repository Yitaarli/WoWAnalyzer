import React from 'react';
import PropTypes from 'prop-types';
import SPELLS from 'common/SPELLS';
import Checklist from 'parser/shared/modules/features/Checklist';
import Rule from 'parser/shared/modules/features/Checklist/Rule';
import Requirement from 'parser/shared/modules/features/Checklist/Requirement';
import PreparationRule from 'parser/shared/modules/features/Checklist/PreparationRule';
import GenericCastEfficiencyRequirement from 'parser/shared/modules/features/Checklist/GenericCastEfficiencyRequirement';

class FrostMageChecklist extends React.PureComponent {
  static propTypes = {
    castEfficiency: PropTypes.object.isRequired,
    combatant: PropTypes.shape({
      hasTalent: PropTypes.func.isRequired,
      hasTrinket: PropTypes.func.isRequired,
    }).isRequired,
    thresholds: PropTypes.object.isRequired,
  };

  render() {
    const { combatant, castEfficiency, thresholds } = this.props;

    const AbilityRequirement = props => (
      <GenericCastEfficiencyRequirement
        castEfficiency={castEfficiency.getCastEfficiencyForSpellId(props.spell)}
        {...props}
      />
    );

    return (
      <Checklist>
        <Rule
          name="Use your cooldowns"
          description={(
            <>
              Using your cooldown abilities as often as possible can help raise your dps significantly. Some help more than others, but as a general rule of thumb you should be looking to use most of your damaging abilities and damage cooldowns as often as possible unless you need to save them for a priority burst phase that is coming up soon.
            </>
          )}
        >
          <AbilityRequirement spell={SPELLS.ICY_VEINS.id} />
          <AbilityRequirement spell={SPELLS.FROZEN_ORB.id} />
          {combatant.hasTalent(SPELLS.EBONBOLT_TALENT.id) && !combatant.hasTalent(SPELLS.GLACIAL_SPIKE_TALENT.id) && <AbilityRequirement spell={SPELLS.EBONBOLT_TALENT.id} />}
          {combatant.hasTalent(SPELLS.COMET_STORM_TALENT.id) && <AbilityRequirement spell={SPELLS.COMET_STORM_TALENT.id} />}
          {combatant.hasTalent(SPELLS.MIRROR_IMAGE_TALENT.id) && <AbilityRequirement spell={SPELLS.MIRROR_IMAGE_TALENT.id} />}
          {combatant.hasTalent(SPELLS.RUNE_OF_POWER_TALENT.id) && <AbilityRequirement spell={SPELLS.RUNE_OF_POWER_TALENT.id} />}
          {combatant.hasTalent(SPELLS.RAY_OF_FROST_TALENT.id) && <AbilityRequirement spell={SPELLS.RAY_OF_FROST_TALENT.id} />}
          {combatant.hasTalent(SPELLS.ICE_NOVA_TALENT.id) && <AbilityRequirement spell={SPELLS.ICE_NOVA_TALENT.id} />}
        </Rule>
        <Rule
          name="Use your procs effectively"
          description={(
            <>
              Frost Mage revolves almost entirely around utilizing your procs effectively. Therefore it is very important that when you get a proc, you use it correctly to prevent them from expiring and to lessen the likelyhood of overwriting them or wasting them.
            </>
          )}
        >
          <Requirement
            name="Used Brain Freeze procs"
            thresholds={thresholds.brainFreezeUtilization}
            tooltip="Your Brain Freeze utilization. Brain Freeze is your most important proc and it is very important that you utilize them properly."
          />
          <Requirement
            name="Used Fingers of Frost procs"
            thresholds={thresholds.fingersOfFrostUtilization}
          />
          <Requirement
            name="Ice Lance into Winter's Chill"
            thresholds={thresholds.wintersChillIceLance}
            tooltip="Using Brain Freeze will apply the Winter's Chill debuff to the target which causes your spells to act as if the target is frozen. Therefore, you should always cast Ice Lance after every instant cast Flurry so that the Ice Lance hits the target while Winter's Chill is up."
          />
          <Requirement
            name="Hardcast into Winter's Chill"
            thresholds={thresholds.wintersChillHardCasts}
            tooltip="Flurry travels faster than your other spells, so you can pre-cast Frostbolt, Ebonbolt, or Glacial Spike before using your instant cast Flurry. This will result in the pre-cast spell landing in the Winter's Chill debuff and dealing bonus shatter damage."
          />
        </Rule>
        <Rule
          name="Use your talents effectively"
          description="Regardless of which talents you select, you should ensure that you are utilizing them properly. If you are having trouble effectively using a particular talent, you should consider taking a different talent that you can utilize properly or focus on effectively using the talents that you have selected."
        >
          {combatant.hasTalent(SPELLS.GLACIAL_SPIKE_TALENT.id) && <Requirement name="Glacial Spike utilization" thresholds={thresholds.glacialSpikeUtilization} />}
          {combatant.hasTalent(SPELLS.RUNE_OF_POWER_TALENT.id) && <Requirement name="Rune of Power uptime" thresholds={thresholds.runeOfPowerBuffUptime} tooltip="Using Rune of Power effectively means being able to stay within the range of it for it's entire duration. If you are unable to do so or if you frequently have to move out of the range of the buff, consider taking a different talent instead." />}
          {!combatant.hasTalent(SPELLS.LONELY_WINTER_TALENT.id) && <Requirement name="Water Elemental utilization" thresholds={thresholds.waterElementalUptime} />}
        </Rule>
        <Rule
          name="Avoid downtime"
          description={(
            <>
              As a DPS, it is important to spend as much time casting as possible since if you arent casting you arent doing damage. Therefore it is important to minimize your movements, stay within range of the target, and try to avoid cancelling casts (unless you have to). While some fights will have an amount of time that is unavoidable downtime; the more you can minimize that downtime, the better.
            </>
          )}
        >
          <Requirement name="Downtime" thresholds={thresholds.downtimeSuggestionThresholds} />
          <Requirement name="Cancelled casts" thresholds={thresholds.cancelledCasts} />
        </Rule>
        <PreparationRule thresholds={thresholds}>
          <Requirement name="Arcane Intellect active" thresholds={thresholds.arcaneIntellectUptime} />
        </PreparationRule>
      </Checklist>
    );
  }
}

export default FrostMageChecklist;
