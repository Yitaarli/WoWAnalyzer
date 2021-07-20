import BaseCombatLogParser from 'parser/tbc/CombatLogParser';

import Abilities from './modules/Abilities';
import AutoShotCooldown from './modules/AutoShotCooldown';
import Buffs from './modules/Buffs';
import Haste from './modules/Haste';
import KillCommandNormalizer from './normalizers/KillCommandNormalizer';

class CombatLogParser extends BaseCombatLogParser {
  static specModules = {
    abilities: Abilities,
    buffs: Buffs,
    autoShotCooldown: AutoShotCooldown,
    haste: Haste,
    killCommandNormalizer: KillCommandNormalizer,
  };

  static suggestions = [...BaseCombatLogParser.suggestions];
}

export default CombatLogParser;
