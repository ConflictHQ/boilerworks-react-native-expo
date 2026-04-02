import type { BirthComplication } from '@/api/models/enums/BirthComplication';
import type { BirthControlMethod } from '@/api/models/enums/BirthControlMethod';
import type { BirthOutcome } from '@/api/models/enums/BirthOutcome';
import type { BreastfeedingFrequency } from '@/api/models/enums/BreastfeedingFrequency';
import type { CycleReturnStatus } from '@/api/models/enums/CycleReturnStatus';
import type { PostpartumBirthType } from '@/api/models/enums/PostpartumBirthType';
import type { RecoveryComplication } from '@/api/models/enums/RecoveryComplication';
import type { PostpartumScreening } from '@/api/models/profiles/PostpartumProfileAttributes';

/** Request body for POST /api/v1/users/:userId/postpartum-profile */
export interface CreatePostpartumProfileRequest {
  postpartumBirthDate: string;
  postpartumBirthType: PostpartumBirthType;
  birthOutcome?: BirthOutcome[];
  numberOfBabiesBorn?: number;
  isBreastfeeding?: boolean;
  breastfeedingFrequency?: BreastfeedingFrequency;
  formulaFeeding?: boolean;
  pumpingExclusively?: boolean;
  breastfeedingStartDate?: string;
  breastfeedingEndDate?: string;
  birthComplications?: BirthComplication[];
  recoveryComplications?: RecoveryComplication[];
  pelvicFloorTherapy?: boolean;
  postpartumCheckupCompleted?: boolean;
  postpartumCheckupDate?: string;
  clearedForExercise?: boolean;
  clearedForIntercourse?: boolean;
  postpartumDepressionScreening?: PostpartumScreening;
  postpartumAnxietyScreening?: PostpartumScreening;
  mentalHealthSupport?: boolean;
  firstPostpartumPeriodDate?: string;
  cycleReturnStatus?: CycleReturnStatus;
  ovulationReturnedBeforePeriod?: boolean;
  postpartumBirthControl?: BirthControlMethod[];
  usingLAM?: boolean;
}
