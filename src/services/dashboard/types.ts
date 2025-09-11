export interface IDashboardDetails {
  efficiencyAlerts: EfficiencyAlert[];
  performanceSummary: PerformanceSummary;
  facilityWiseChillerLogs: FacilityWiseChillerLog[];
  facilityWisePerformance: FacilityWisePerformance[];
  chillers: Chiller[];
}

export interface EfficiencyAlert {
  _id: string;
  chillerId: string;
  logId: string;
  readingDate: string;
  readingDateUTC: string;
  facilityTimezone?: string;
  effLoss: number;
  condAppLoss: number;
  evapAppLoss: number;
  nonCondLoss: number;
  otherLoss: number;
  facilityName?: string;
  chillerName: string;
  ChillerNo: string;
  totalLoss: number;
}

export interface PerformanceSummary {
  [year: string]: Metrics | undefined;
  thisYTD: Metrics;
  lastYTD: Metrics;
  last12Months: Metrics;
}

export interface Metrics {
  averageLoss: number;
  targetCost: number;
  actualCost: number;
  lossCost: number;
  kwhLoss: number;
  btuLoss: number;
  co2: number;
}

export interface FacilityWiseChillerLog {
  facilityId: string;
  facilityName: string;
  facilityTimezone?: string;
  chillerLogs: ChillerLog[];
}

export interface ChillerLog {
  _id: string;
  ChillerNo: string;
  chillerName: string;
  chillerId: string;
  logId: string;
  effLoss: number;
  condAppLoss: number;
  evapAppLoss: number;
  nonCondLoss: number;
  otherLoss: number;
  totalLoss: number;
  readingDate: string;
  readingDateUTC: string;
}

export interface FacilityWisePerformance {
  facilityId: string;
  facilityName: string;
  performance: Performance;
}

export interface Performance {
  [year: string]: Metrics | undefined;
  thisYTD: Metrics;
  lastYTD: Metrics;
  last12Months: Metrics;
}

export interface N20222 {
  averageLoss: number;
  targetCost: number;
  lossCost: number;
  actualCost: number;
  kwhLoss: number;
  btuLoss: number;
  co2: number;
}

export interface N20232 {
  averageLoss: number;
  targetCost: number;
  lossCost: number;
  actualCost: number;
  kwhLoss: number;
  btuLoss: number;
  co2: number;
}

export interface ThisYtd2 {
  averageLoss: number;
  targetCost: number;
  lossCost: number;
  actualCost: number;
  kwhLoss: number;
  btuLoss: number;
  co2: number;
}

export interface LastYtd2 {
  averageLoss: number;
  targetCost: number;
  lossCost: number;
  actualCost: number;
  kwhLoss: number;
  btuLoss: number;
  co2: number;
}

export interface Last12Months2 {
  averageLoss: number;
  targetCost: number;
  lossCost: number;
  actualCost: number;
  kwhLoss: number;
  btuLoss: number;
  co2: number;
}

export interface Chiller {
  _id: string;
  facilityId: string;
  make: string;
  model: string;
  status: string;
  energyCost: number;
  emissionFactor?: number;
  facilityName: string;
  latestLog?: LatestLog;
  hasHighEfficiencyLoss: boolean;
  lastReadingDate?: string;
  lastReadingDateUTC?: string;
}

export interface LatestLog {
  _id: string;
  chillerId: string;
  companyId: string;
  facilityId: string;
  userId: string;
  updatedBy: string;
  readingDate: string;
  readingDateUTC: string;
  condInletTemp: number;
  condOutletTemp: number;
  condRefrigTemp: number;
  condPressure: number;
  condAPDrop: number;
  evapInletTemp: number;
  evapOutletTemp: number;
  evapRefrigTemp: number;
  evapPressure: number;
  evapAPDrop: number;
  ampsPhase1: number;
  ampsPhase2: number;
  ampsPhase3: number;
  voltsPhase1: number;
  voltsPhase2: number;
  voltsPhase3: number;
  oilPresHigh: number;
  oilPresLow: number;
  oilPresDif: number;
  bearingTemp: number;
  runHours: number;
  comp1RunHours: number;
  lastRunHours: number;
  lastRunHoursReadingDate: number;
  purgeTimeMin: number;
  userNote: string;
  airTemp: number;
  targetCost: number;
  actualCost: number;
  lossCost: number;
  totalLoss: number;
  effLoss: number;
  condInletLoss: number;
  condInletLossCost: number;
  EFLCondAppLoss: number;
  condApproach: number;
  condAppLoss: number;
  condAppLossCost: number;
  evapTempLoss: number;
  evapTempLossCost: number;
  EFLEvapAppLoss: number;
  evapAppLoss: number;
  evapAppLossCost: number;
  nonCondLoss: number;
  nonCondLossCost: number;
  deltaLoss: number;
  deltaLossCost: number;
  otherLoss: number;
  condFlow: number;
  evapFlow: number;
  energyCost: number;
  ampImbalance: number;
  voltImbalance: number;
  actualLoad: number;
  finalOilDiff: number;
  condAppVariance: number;
  nonCondensables: number;
  calculatedEvapRefrigTemp: number;
  calculatedCondRefrigTemp: number;
  evapAppVariance: number;
  evapApproach: number;
  altitudeCorrection: number;
  validRunHours: boolean;
  runHourStart: boolean;
  comp1RunHourStart: boolean;
  KWHLoss: number;
  BTULoss: number;
  CO2: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
