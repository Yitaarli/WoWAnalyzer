import SPELLS from 'common/SPELLS';
import TALENTS from 'common/TALENTS/mage';
import EventLinkNormalizer, { EventLink } from 'parser/core/EventLinkNormalizer';
import {
  CastEvent,
  EventType,
  GetRelatedEvent,
  GetRelatedEvents,
  HasRelatedEvent,
  RemoveDebuffEvent,
} from 'parser/core/Events';
import { Options } from 'parser/core/Module';

const CAST_BUFFER_MS = 75;

const SPELL_CAST = 'SpellCast';
const SPELL_DAMAGE = 'SpellDamage';
const SPELL_TICK = 'SpellTick';
const BUFF_APPLY = 'BuffApply';
const BUFF_REMOVE = 'BuffRemove';
const DEBUFF_APPLY = 'DebuffApply';
const DEBUFF_REMOVE = 'DebuffRemove';
const ENERGIZE = 'Energize';

const EVENT_LINKS: EventLink[] = [
  {
    reverseLinkRelation: SPELL_CAST,
    linkingEventId: SPELLS.ARCANE_EXPLOSION.id,
    linkingEventType: EventType.Cast,
    linkRelation: SPELL_DAMAGE,
    referencedEventId: SPELLS.ARCANE_EXPLOSION.id,
    referencedEventType: EventType.Damage,
    anyTarget: true,
    forwardBufferMs: CAST_BUFFER_MS,
    backwardBufferMs: CAST_BUFFER_MS,
  },
  {
    reverseLinkRelation: SPELL_CAST,
    linkingEventId: SPELLS.ARCANE_BARRAGE.id,
    linkingEventType: EventType.Cast,
    linkRelation: SPELL_DAMAGE,
    referencedEventId: SPELLS.ARCANE_BARRAGE.id,
    referencedEventType: EventType.Damage,
    anyTarget: true,
    forwardBufferMs: 2000,
    backwardBufferMs: CAST_BUFFER_MS,
  },
  {
    reverseLinkRelation: SPELL_CAST,
    linkingEventId: SPELLS.ARCANE_ORB.id,
    linkingEventType: EventType.Cast,
    linkRelation: SPELL_DAMAGE,
    referencedEventId: SPELLS.ARCANE_ORB_DAMAGE.id,
    referencedEventType: EventType.Damage,
    anyTarget: true,
    additionalCondition(linkingEvent, referencedEvent): boolean {
      return !HasRelatedEvent(referencedEvent, SPELL_CAST);
    },
    forwardBufferMs: 2500,
    backwardBufferMs: CAST_BUFFER_MS,
  },
  {
    reverseLinkRelation: SPELL_CAST,
    linkingEventId: SPELLS.ARCANE_ORB.id,
    linkingEventType: EventType.Cast,
    linkRelation: ENERGIZE,
    referencedEventId: SPELLS.ARCANE_ORB.id,
    referencedEventType: EventType.ResourceChange,
    anyTarget: true,
    forwardBufferMs: CAST_BUFFER_MS,
    backwardBufferMs: CAST_BUFFER_MS,
  },
  {
    reverseLinkRelation: SPELL_CAST,
    linkingEventId: TALENTS.SHIFTING_POWER_TALENT.id,
    linkingEventType: EventType.Cast,
    linkRelation: SPELL_TICK,
    referencedEventId: SPELLS.SHIFTING_POWER_TICK.id,
    referencedEventType: EventType.Cast,
    anyTarget: true,
    forwardBufferMs: 5000,
    backwardBufferMs: CAST_BUFFER_MS,
  },
  {
    reverseLinkRelation: SPELL_CAST,
    linkingEventId: TALENTS.ARCANE_SURGE_TALENT.id,
    linkingEventType: EventType.Cast,
    linkRelation: SPELL_DAMAGE,
    referencedEventId: TALENTS.ARCANE_SURGE_TALENT.id,
    referencedEventType: EventType.Damage,
    maximumLinks: 1,
    anyTarget: true,
    forwardBufferMs: CAST_BUFFER_MS,
    backwardBufferMs: CAST_BUFFER_MS,
  },
  {
    reverseLinkRelation: SPELL_CAST,
    linkingEventId: TALENTS.TOUCH_OF_THE_MAGI_TALENT.id,
    linkingEventType: EventType.Cast,
    linkRelation: DEBUFF_APPLY,
    referencedEventId: SPELLS.TOUCH_OF_THE_MAGI_DEBUFF.id,
    referencedEventType: EventType.ApplyDebuff,
    maximumLinks: 1,
    anyTarget: true,
    forwardBufferMs: CAST_BUFFER_MS,
    backwardBufferMs: CAST_BUFFER_MS,
  },
  {
    reverseLinkRelation: DEBUFF_APPLY,
    linkingEventId: SPELLS.TOUCH_OF_THE_MAGI_DEBUFF.id,
    linkingEventType: EventType.ApplyDebuff,
    linkRelation: DEBUFF_REMOVE,
    referencedEventId: SPELLS.TOUCH_OF_THE_MAGI_DEBUFF.id,
    referencedEventType: EventType.RemoveDebuff,
    maximumLinks: 1,
    anyTarget: true,
    forwardBufferMs: 15000,
    backwardBufferMs: CAST_BUFFER_MS,
  },
  {
    reverseLinkRelation: DEBUFF_APPLY,
    linkingEventId: SPELLS.TOUCH_OF_THE_MAGI_DEBUFF.id,
    linkingEventType: EventType.ApplyDebuff,
    linkRelation: SPELL_DAMAGE,
    referencedEventId: [
      SPELLS.ARCANE_BLAST.id,
      SPELLS.ARCANE_MISSILES_DAMAGE.id,
      SPELLS.ARCANE_BARRAGE.id,
      SPELLS.ARCANE_EXPLOSION.id,
    ],
    referencedEventType: EventType.Damage,
    anyTarget: true,
    additionalCondition(linkingEvent, referencedEvent): boolean {
      const debuffEnd: RemoveDebuffEvent | undefined = GetRelatedEvent(linkingEvent, DEBUFF_REMOVE);
      return debuffEnd && referencedEvent.timestamp < debuffEnd.timestamp ? true : false;
    },
    forwardBufferMs: 15000,
    backwardBufferMs: CAST_BUFFER_MS,
  },
  {
    reverseLinkRelation: SPELL_CAST,
    linkingEventId: TALENTS.TOUCH_OF_THE_MAGI_TALENT.id,
    linkingEventType: EventType.Cast,
    linkRelation: DEBUFF_REMOVE,
    referencedEventId: SPELLS.TOUCH_OF_THE_MAGI_DEBUFF.id,
    referencedEventType: EventType.RemoveDebuff,
    maximumLinks: 1,
    anyTarget: true,
    forwardBufferMs: 14000,
    backwardBufferMs: CAST_BUFFER_MS,
  },
  {
    reverseLinkRelation: SPELL_CAST,
    linkingEventId: TALENTS.TOUCH_OF_THE_MAGI_TALENT.id,
    linkingEventType: EventType.Cast,
    linkRelation: SPELL_DAMAGE,
    referencedEventId: SPELLS.ARCANE_ECHO_DAMAGE.id,
    referencedEventType: EventType.Damage,
    anyTarget: true,
    forwardBufferMs: 14000,
    backwardBufferMs: CAST_BUFFER_MS,
  },
  {
    reverseLinkRelation: BUFF_APPLY,
    linkingEventId: SPELLS.CLEARCASTING_ARCANE.id,
    linkingEventType: [EventType.ApplyBuff, EventType.ApplyBuffStack],
    linkRelation: BUFF_REMOVE,
    referencedEventId: SPELLS.CLEARCASTING_ARCANE.id,
    referencedEventType: [EventType.RemoveBuff, EventType.RemoveBuffStack],
    maximumLinks: 1,
    anyTarget: true,
    additionalCondition(linkingEvent, referencedEvent): boolean {
      return !HasRelatedEvent(referencedEvent, BUFF_APPLY);
    },
    forwardBufferMs: 21000,
    backwardBufferMs: CAST_BUFFER_MS,
  },
  {
    reverseLinkRelation: BUFF_APPLY,
    linkingEventId: SPELLS.CLEARCASTING_ARCANE.id,
    linkingEventType: [EventType.ApplyBuff, EventType.ApplyBuffStack],
    linkRelation: SPELL_CAST,
    referencedEventId: TALENTS.ARCANE_MISSILES_TALENT.id,
    referencedEventType: EventType.Cast,
    maximumLinks: 1,
    anyTarget: true,
    additionalCondition(linkingEvent, referencedEvent): boolean {
      return !HasRelatedEvent(referencedEvent, SPELL_CAST);
    },
    forwardBufferMs: 21000,
    backwardBufferMs: CAST_BUFFER_MS,
  },
  {
    reverseLinkRelation: BUFF_APPLY,
    linkingEventId: SPELLS.NETHER_PRECISION_BUFF.id,
    linkingEventType: EventType.ApplyBuff,
    linkRelation: BUFF_REMOVE,
    referencedEventId: SPELLS.NETHER_PRECISION_BUFF.id,
    referencedEventType: EventType.RemoveBuff,
    maximumLinks: 1,
    forwardBufferMs: 11000,
    backwardBufferMs: CAST_BUFFER_MS,
  },
  {
    reverseLinkRelation: BUFF_APPLY,
    linkingEventId: SPELLS.NETHER_PRECISION_BUFF.id,
    linkingEventType: EventType.ApplyBuff,
    linkRelation: SPELL_DAMAGE,
    referencedEventId: [SPELLS.ARCANE_BLAST.id, SPELLS.ARCANE_BARRAGE.id],
    referencedEventType: EventType.Damage,
    maximumLinks: 2,
    anyTarget: true,
    forwardBufferMs: 10500,
    backwardBufferMs: CAST_BUFFER_MS,
  },
  {
    reverseLinkRelation: BUFF_APPLY,
    linkingEventId: SPELLS.NETHER_PRECISION_BUFF.id,
    linkingEventType: EventType.ApplyBuff,
    linkRelation: SPELL_CAST,
    referencedEventId: TALENTS.ARCANE_MISSILES_TALENT.id,
    referencedEventType: EventType.Cast,
    maximumLinks: 1,
    forwardBufferMs: 10500,
    backwardBufferMs: CAST_BUFFER_MS,
  },
  {
    reverseLinkRelation: BUFF_APPLY,
    linkingEventId: SPELLS.SIPHON_STORM_BUFF.id,
    linkingEventType: EventType.ApplyBuff,
    linkRelation: BUFF_REMOVE,
    referencedEventId: SPELLS.SIPHON_STORM_BUFF.id,
    referencedEventType: EventType.RemoveBuff,
    maximumLinks: 1,
    forwardBufferMs: 25000,
    backwardBufferMs: CAST_BUFFER_MS,
  },
  {
    reverseLinkRelation: BUFF_APPLY,
    linkingEventId: SPELLS.SIPHON_STORM_BUFF.id,
    linkingEventType: EventType.ApplyBuff,
    linkRelation: SPELL_DAMAGE,
    referencedEventId: TALENTS.ARCANE_SURGE_TALENT.id,
    referencedEventType: EventType.Damage,
    maximumLinks: 1,
    anyTarget: true,
    forwardBufferMs: 20500,
    backwardBufferMs: CAST_BUFFER_MS,
  },
];

/**
 *Links the damage events for spells to their cast event. This allows for more easily accessing the related events in spec modules instead of looking at the events separately.
 */
class CastLinkNormalizer extends EventLinkNormalizer {
  constructor(options: Options) {
    super(options, EVENT_LINKS);
  }
}

export function getHitCount(aoeCastEvent: CastEvent): number {
  return GetRelatedEvents(aoeCastEvent, SPELL_DAMAGE).length;
}

export default CastLinkNormalizer;
