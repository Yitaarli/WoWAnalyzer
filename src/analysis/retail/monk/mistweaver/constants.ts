import SPELLS from 'common/SPELLS';
import { TALENTS_MONK } from 'common/TALENTS';
export const ABILITIES_AFFECTED_BY_HEALING_INCREASES = [
  // Spells
  TALENTS_MONK.ENVELOPING_MIST_TALENT.id,
  SPELLS.ENVELOPING_MIST_TFT.id,
  SPELLS.ENVELOPING_BREATH_HEAL.id,
  TALENTS_MONK.RENEWING_MIST_TALENT.id,
  SPELLS.RENEWING_MIST_HEAL.id,
  SPELLS.VIVIFY.id,
  TALENTS_MONK.SOOTHING_MIST_TALENT.id,
  SPELLS.SOOTHING_BREATH.id,
  SPELLS.AT_CRIT_HEAL.id,
  SPELLS.AT_HEAL.id,
  SPELLS.GUSTS_OF_MISTS.id,
  SPELLS.GUST_OF_MISTS_CHIJI.id,
  SPELLS.EXPEL_HARM.id,

  //Hero Talents
  TALENTS_MONK.CELESTIAL_CONDUIT_TALENT.id,
  SPELLS.FLIGHT_OF_THE_RED_CRANE_HEAL.id,
  SPELLS.FLIGHT_OF_THE_RED_CRANE_UNITY.id,

  SPELLS.COURAGE_OF_THE_WHITE_TIGER_HEAL.id,

  // Cooldowns
  TALENTS_MONK.REVIVAL_TALENT.id,
  TALENTS_MONK.RESTORAL_TALENT.id,

  // Talents
  TALENTS_MONK.CHI_BURST_TALENT.id,
  SPELLS.CHI_BURST_HEAL.id,
  TALENTS_MONK.CHI_WAVE_TALENT.id,
  TALENTS_MONK.REFRESHING_JADE_WIND_TALENT.id,
  SPELLS.REFRESHING_JADE_WIND_HEAL.id,
  TALENTS_MONK.SHEILUNS_GIFT_TALENT.id,
  SPELLS.RISING_MIST_HEAL.id,
  TALENTS_MONK.HEALING_WINDS_TALENT.id,
  SPELLS.HEALING_WINDS_HEAL.id,
  SPELLS.ZEN_PULSE_HEAL.id,
  SPELLS.YULONS_WHISPER_HEAL.id,
  SPELLS.JADEFIRE_STOMP_HEAL.id,
  SPELLS.BURST_OF_LIFE_HEAL.id,
  SPELLS.OVERFLOWING_MISTS_HEAL.id,
  // Misc
  SPELLS.LEECH.id,
];

export const THUNDER_FOCUS_TEA_SPELLS = [
  SPELLS.VIVIFY,
  TALENTS_MONK.RISING_SUN_KICK_TALENT,
  TALENTS_MONK.ENVELOPING_MIST_TALENT,
  TALENTS_MONK.RENEWING_MIST_TALENT,
  SPELLS.EXPEL_HARM,
];

// Core Constants
export const LIFE_COCOON_HEALING_BOOST = 0.5;
export const REM_BASE_DURATION = 20000;
export const ENV_BASE_DURATION = 6000;
export const TFT_REM_EXTRA_DURATION = 10000;

// Talent Constants
export const POOL_OF_MISTS_CDR = 1000;
export const MISTWRAP = 1000;
export const MISTY_PEAKS_DURATION = 2000;
export const RISING_MIST = 2;
export const LOTUS_INFUSION_DURATION = 2000;
export const LOTUS_INFUSION_BOOST = 0.08;
export const CHI_HARMONY_BOOST = 0.5;
export const CHI_HARMONY_DURATION = 8000;
export const LEGACY_OF_WISDOM_TARGETS = 2;
export const SHEILUNS_GIFT_TARGETS = 3;
export const MAX_CHIJI_STACKS = 3;
export const MANA_TEA_MAX_STACKS = 20;
export const MANA_TEA_REDUCTION = 0.3;
export const JADE_BOND_INC = 0.4;
export const JADE_BOND_SOOB_INC = 3;
export const NOURISHING_CHI_INC = 0.2;
export const DANCING_MIST_CHANCE = 0.08;
export const RAPID_DIFFUSION_DURATION = 3000; // per rank
export const RISING_MIST_EXTENSION = 4000;
export const ENVELOPING_MIST_INCREASE = 0.3;
export const MISTWRAP_INCREASE = 0.1;
export const YULON_REDUCTION = 0.5;
export const ANCIENT_ARTS_LEG_SWEEP = 5;
export const ANCIENT_ARTS_PARALYSIS = 8;
export const LIGHTER_THAN_AIR_ROLL = 2;
export const PEACE_AND_PROSPERITY_ROP = 5;
export const VIVACIOUS_VIVIFICATION_BOOST = 0.2;
export const ZEN_PULSE_INCREASE_PER_STACK = 0.06;
export const ZEN_PULSE_MAX_HITS_FOR_BOOST = 5;

export const ATTRIBUTION_STRINGS = {
  BOUNCED: 'Bounced',
  HARDCAST_ENVELOPING_MIST: 'Enveloping Mist Hardcast',
  MISTY_PEAKS_ENVELOPING_MIST: 'Enveloping Mist Misty Peaks Proc',
  HARDCAST_RENEWING_MIST: 'Renewing Mist Hardcast',
  RAPID_DIFFUSION_RENEWING_MIST: 'Renewing Mist Rapid Diffusion',
  DANCING_MIST_RENEWING_MIST: 'Renewing Mist Dancing Mist',
  MISTS_OF_LIFE_RENEWING_MIST: 'Renewing Mist Mists of Life',
  DANCING_MIST_SOURCES: {
    DM_SOURCE_RD: 'Dancing Mist Source - Rapid Diffusion',
    DM_SOURCE_HC: 'Dancing Mist Source - Hardcast',
    DM_SOURCE_MOL: 'Dancing Mist Source - Mists of Life',
  },
  RAPID_DIFFUSION_SOURCES: {
    RD_SOURCE_RSK: 'Rapid Diffusion Source - Rising Sun Kick',
    RD_SOURCE_ENV: 'Rapid Diffusion Source - Enveloping Mist',
  },
  YULON: "Hardcast During Yu'lon",
};

export const SECRET_INFUSION_BUFFS = [
  SPELLS.SECRET_INFUSION_CRIT_BUFF,
  SPELLS.SECRET_INFUSION_HASTE_BUFF,
  SPELLS.SECRET_INFUSION_MASTERY_BUFF,
  SPELLS.SECRET_INFUSION_VERS_BUFF,
];

export const LESSONS_BUFFS = [
  SPELLS.LESSON_OF_ANGER_BUFF,
  SPELLS.LESSON_OF_FEAR_BUFF,
  SPELLS.LESSON_OF_DOUBT_BUFF,
  SPELLS.LESSON_OF_DESPAIR_BUFF,
];

export const SPELL_COLORS = {
  MISTY_PEAKS: '#c8fadb',
  DANCING_MIST: '#42e7fc',
  RAPID_DIFFUSION: '#1c9c4d',
  DANCING_MISTS: '#38ffdb',
  ESSENCE_FONT: '#1f77b4',
  ESSENCE_FONT_BUFF: '#aec7e8',
  GUSTS_OF_MISTS: '#ff7f0e',
  VIVIFY: '#00FF98',
  RENEWING_MIST: '#14522c',
  ENVELOPING_MIST: '#98df8a',
  SOOTHING_MIST: '#d62728',
  EXPEL_HARM: '#ff9896',
  REVIVAL: '#9467bd',
  RISING_SUN_KICK: '#c5b0d5',
  BLACKOUT_KICK: '#8c564b',
  BLACKOUT_KICK_TOTM: '#c49c94',
  TIGER_PALM: '#e377c2',
  UPLIFTED_SPIRITS: '#f7b6d2',
  ALTERNATE_GUST_OF_MIST: '#7f7f7f',
  ZEN_PULSE: '#c6f4f5',
};
