export interface IAddChillerReq {
  id?: string;
  companyId: string;
  facilityId: string;
  unit: string;
  ChillerNo: string;
  weeklyHours: number;
  weeksPerYear: number;
  avgLoadProfile: number;
  desInletWaterTemp: string;
  make: string;
  model: string;
  serialNumber: string;
  manufacturedYear: number;
  refrigType: string;
  tons: number | null;
  kwr: number | null;
  efficiencyRating: number;
  energyCost: number;
  highPressureRefrig?: boolean;
  useEvapRefrigTemp: boolean;
  designVoltage: number;
  voltageChoice: string;
  fullLoadAmps: number;
  ampChoice: string;
  condDPDrop: number | null;
  condDPDropUnit: string | null;
  condPressureUnit: string;
  condAPDropUnit: string;
  condApproach: number;
  evapDPDrop: number | null;
  evapDPDropUnit: string | null;
  evapPressureUnit: string;
  evapAPDropUnit: string;
  evapApproach: number | null;
  evapDOWTemp: number;
  compOPIndicator: string;
  userNote: string | null;
  havePurge: boolean;
  maxPurgeTime: number;
  purgeReadingUnit: string;
  haveBearingTemp: boolean;
  useRunHours: string;
  condDesignDeltaT: number | null;
  condDesignFlow: number | null;
  evapDesignDeltaT: number | null;
  evapDesignFlow: number | null;
  numberOfCompressors: number;
  oilPresHighUnit?: string;
  oilPresLowUnit?: string;
  oilPresDifUnit?: string;
  useLoad?: boolean;
  status?: string;
  emissionFactor: number;
  ChillerNumber: string;
}

export interface IChillerListRes {
  chillerList: IChillerList[];
  totalRecords: number;
}

export interface IChillerList {
  _id: string;
  companyId: string;
  facilityId: string;
  unit: string;
  ChillerNo?: string;
  make: any;
  model: string;
  tons: number;
  serialNumber?: string;
  kwr: number;
  efficiencyRating?: number;
  energyCost: number;
  emissionFactor: number;
  createdAt: string;
  companyName: string;
  facilityName: string;
  chillerName: string;
  status?: string;
  latestLog?: LatestLog;
  ChillerNumber: string;
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
  condPressure: number;
  condAPDrop: number;
  updatedByUser: { firstName?: string; lastName?: string };
  evapInletTemp: number;
  evapOutletTemp: number;
  evapRefrigTemp: number;
  evapPressure: number;
  evapAPDrop: number;
  ampsPhase1: number;
  ampsPhase2: number;
  ampsPhase3: number;
  oilPresHigh: number;
  oilPresLow: number;
  oilPresDif: number;
  bearingTemp: number;
  runHours: number;
  comp1RunHours: number;
  comp2RunHours: number;
  purgeTimeMin: number;
  userNote: string;
  airTemp: number;
  targetCost: number;
  actualCost: number;
  lossCost: number;
  totalLoss: number;
  effLoss: EffLoss;
  condInletLoss: number;
  condInletLossCost: number;
  EFLCondAppLoss: number;
  condApproach: number;
  condAppLoss: CondAppLoss;
  condAppLossCost: number;
  evapTempLoss: number;
  evapTempLossCost: number;
  EFLEvapAppLoss: number;
  evapAppLoss: EvapAppLoss;
  evapAppLossCost: number;
  nonCondLoss: NonCondLoss;
  nonCondLossCost: number;
  deltaLoss: number;
  deltaLossCost: number;
  otherLoss: OtherLoss;
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
  evapAppVariance: number;
  evapApproach: number;
  altitudeCorrection: number;
  validRunHours: boolean;
  runHourStart: boolean;
  comp1RunHourStart: boolean;
  comp2RunHourStart: boolean;
  KWHLoss: number;
  BTULoss: number;
  CO2: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EffLoss {
  value: number;
  type: string;
}

export interface CondAppLoss {
  value: number;
  type: string;
}

export interface EvapAppLoss {
  value: number;
  type: string;
}

export interface NonCondLoss {
  value: number;
  type: string;
}

export interface OtherLoss {
  value: number;
  type: string;
}

export interface IChillerViewRes {
  _id: string;
  companyId: string;
  facilityId: string;
  facilityTimezone?: string;
  type: string;
  unit: string;
  ChillerNo: string;
  weeklyHours: number;
  weeksPerYear: number;
  avgLoadProfile: number;
  desInletWaterTemp: string;
  make: string;
  model: string;
  status: string;
  serialNumber: string;
  manufacturedYear: number;
  tons?: number;
  kwr?: number;
  efficiencyRating: number;
  energyCost: number;
  refrigType: string;
  highPressureRefrig: boolean;
  useEvapRefrigTemp: boolean;
  designVoltage: number;
  voltageChoice: string;
  fullLoadAmps: number;
  ampChoice: string;
  condDPDrop: number;
  condDPDropUnit: string;
  condPressureUnit: string;
  condAPDropUnit: string;
  condApproach: number;
  evapDPDrop: number;
  evapDPDropUnit: string;
  evapPressureUnit: string;
  evapAPDropUnit: string;
  evapApproach: number;
  evapDOWTemp: number;
  compOPIndicator: string;
  userNote: string;
  havePurge: boolean;
  maxPurgeTime: number;
  purgeReadingUnit: string;
  haveBearingTemp: boolean;
  useRunHours: string;
  oilPresHighUnit: string;
  oilPresLowUnit: string;
  oilPresDifUnit: string;
  condDesignDeltaT: number;
  condDesignFlow: number;
  evapDesignDeltaT: number;
  evapDesignFlow: number;
  numberOfCompressors: number;
  useLoad: boolean;
  companyName: string;
  facilityName: string;
  emissionFactor: number;
  ChillerNumber: string;
  recentReadingAnalysis: RecentReadingAnalysis;
  performanceSummary: PerformanceSummary;
  compressorRunHours: CompressorRunHours;
  purgeData: PurgeData;
}

export interface RecentReadingAnalysis {
  dateTime: string;
  formattedTime: string;
  logId?: string;
  problem?: ProblemSolution[];
  problemDetails: any[];
  solutions: any[];
  effLoss: EffLoss2;
  effLossAtAverageLoadProfile: EffLossAtAverageLoadProfile;
  effLossAtFullLoad: number;
  projectedAnnualCostOfLoss: any;
  condAppLoss: CondAppLoss2;
  evapAppLoss: EvapAppLoss2;
  nonCondLoss: NonCondLoss2;
  otherLoss: OtherLoss2;
  totalLoss: number;
  lossTypes: LossTypes;
  readingDateUTC?: string;
}

export interface ProblemSolution {
  _id: string;
  section: string;
  field: string;
  problem: string;
  solution: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  updated_by: string;
  updated_by_profile: string;
  prob_eff_loss?: number;
  proj_cost_of_loss?: number;
}

export interface EffLoss2 {
  value: number;
  type: string;
}

export interface EffLossAtAverageLoadProfile {
  value: number;
  type: string;
}

export interface CondAppLoss2 {
  value: number;
  type: string;
}

export interface EvapAppLoss2 {
  value: number;
  type: string;
}

export interface NonCondLoss2 {
  value: number;
  type: string;
}

export interface OtherLoss2 {
  value: number;
  type: string;
}

export interface LossTypes {
  effLoss: EffLoss3;
  condAppLoss: CondAppLoss3;
  evapAppLoss: EvapAppLoss3;
  nonCondLoss: NonCondLoss3;
  otherLoss: OtherLoss3;
}

export interface EffLoss3 {
  value: number;
  type: string;
}

export interface CondAppLoss3 {
  value: number;
  type: string;
}

export interface EvapAppLoss3 {
  value: number;
  type: string;
}

export interface NonCondLoss3 {
  value: number;
  type: string;
}

export interface OtherLoss3 {
  value: number;
  type: string;
}

export interface PerformanceSummary {
  '1': N1;
  '2': N2;
  '3': N3;
  costMetrics: CostMetrics;
  efficiencyMetrics: EfficiencyMetrics;
}

export interface N1 {
  perfSummary: PerfSummary;
  startDate: string;
  endDate: string;
  useRunHours: boolean;
  runHours: number;
}

export interface PerfSummary {
  avgLoss: number;
  avgOtherLoss: number;
  avgExcessCondApp: number;
  avgExcessEvapApp: number;
  targetCost: number;
  lossCost: number;
  actualCost: number;
  kwhLoss: number;
  BTULoss: number;
  CO2: number;
}

export interface N2 {
  perfSummary: PerfSummary2;
  startDate: string;
  endDate: string;
  useRunHours: boolean;
  runHours: number;
}

export interface PerfSummary2 {
  avgLoss: number;
  avgOtherLoss: number;
  avgExcessCondApp: number;
  avgExcessEvapApp: number;
  targetCost: number;
  lossCost: number;
  actualCost: number;
  kwhLoss: number;
  BTULoss: number;
  CO2: number;
}

export interface N3 {
  perfSummary: PerfSummary3;
  startDate: string;
  endDate: string;
  useRunHours: boolean;
  runHours: number;
}

export interface PerfSummary3 {
  avgLoss: number;
  avgOtherLoss: number;
  avgExcessCondApp: number;
  avgExcessEvapApp: number;
  targetCost: number;
  lossCost: number;
  actualCost: number;
  kwhLoss: number;
  BTULoss: number;
  CO2: number;
}

export interface CostMetrics {
  targetCost: number;
  actualCost: number;
  lossCost: number;
  avgLoss: number;
}

export interface EfficiencyMetrics {
  avgEffLoss: number;
  kwhLoss: number;
  btuLoss: number;
  co2: number;
}

export interface CompressorRunHours {
  runHrYTD: number;
  runHrLastYTD: number;
  runHrLast12Months: number;
  estAnnualRunHr: number;
  weeklyHours: number;
  weeksPerYear: number;
  useRunHours: string;
}

export interface PurgeData {
  mostRecent7DayAvg: number;
  mostRecent30DayAvg: number;
  havePurge: boolean;
  maxPurgeTime: number;
  purgeReadingUnit: string;
  display7DayAvg: string;
  display30DayAvg: string;
}

export interface IChillerTimeLine {
  timelineList: TimelineList[];
  totalRecords: number;
}

export interface TimelineList {
  _id: string;
  chillerId: string;
  title: string;
  description: string;
  updatedBy: string;
  createdAt: string;
}

export interface IChillerAllListRes {
  chillerList: IChillerAllList[];
  totalRecords: number;
}

export interface IChillerAllList {
  _id: string;
  companyId: string;
  facilityId: string;
  ChillerNo: string;
  make: string;
  model: string;
  status: string;
  tons: number;
  energyCost: number;
  createdAt: string;
  facilityName: string;
  totalOperators: number;
  latestLog?: LatestLog;
}
