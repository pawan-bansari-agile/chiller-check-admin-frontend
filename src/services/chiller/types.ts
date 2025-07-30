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
  createdAt: string;
  companyName: string;
  facilityName: string;
  chillerName: string;
  status?: string;
}

export interface IChillerViewRes {
  _id: string;
  companyId: string;
  facilityId: string;
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
}
