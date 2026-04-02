import type { CycleRegularity } from '@/api/models/enums/CycleRegularity';
import type { NfpMethod } from '@/api/models/enums/NfpMethod';

/** Request body for POST /api/v1/users/:userId/cycle-tracking-profile */
export interface CreateCycleTrackingProfileRequest {
  lastPeriodStartDate?: string;
  lastPeriodEndDate?: string;
  averageCycleLength?: number;
  periodLength?: number;
  cycleRegularity?: CycleRegularity;
  lutealPhaseLength?: number;
  ovulationDayOffset?: number;
  typicalPeriodSymptoms?: string[];
  basalBodyTemperatureTrackingEnabled?: boolean;
  cervicalMucusTrackingEnabled?: boolean;
  nfpMethod?: NfpMethod;
}
