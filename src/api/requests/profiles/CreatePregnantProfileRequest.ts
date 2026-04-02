import type { AnxietyLevel } from '@/api/models/enums/AnxietyLevel';
import type { ConceptionMethod } from '@/api/models/enums/ConceptionMethod';
import type { DeliveryType } from '@/api/models/enums/DeliveryType';
import type { DueDateCalculationMethod } from '@/api/models/enums/DueDateCalculationMethod';
import type { PregnancyType } from '@/api/models/enums/PregnancyType';
import type { PrenatalCareProviderType } from '@/api/models/enums/PrenatalCareProviderType';

/** Request body for POST /api/v1/users/:userId/pregnant-profile */
export interface CreatePregnantProfileRequest {
  pregnancyStartDate: string;
  currentDueDate: string;
  dueDateCalculationMethod?: DueDateCalculationMethod;
  dueDateLastUpdated?: string;
  multiplePregnancy?: boolean;
  numberOfFetuses?: number;
  pregnancyType?: PregnancyType;
  prenatalCareProviderType?: PrenatalCareProviderType;
  deliveryType?: DeliveryType;
  highRiskPregnancy?: boolean;
  highRiskFactors?: string[];
  pregnancyComplications?: string[];
  birthPlanCompleted?: boolean;
  birthPlanNotes?: string;
  desiredPainManagement?: string[];
  conceptionMethod?: ConceptionMethod;
  ivfCycleNumber?: number;
  previousPregnancyLosses?: number;
  anxietyLevel?: AnxietyLevel;
}
