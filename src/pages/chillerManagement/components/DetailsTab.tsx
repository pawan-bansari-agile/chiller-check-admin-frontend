import React from 'react';

import { IChillerViewRes } from '@/services/chiller/types';

import Details from '@/shared/components/common/Details';
import { MEASUREMENT_UNITS } from '@/shared/constants';

import { Wrapper } from '../style';

interface IProps {
  chillerData: IChillerViewRes;
}

const DetailsTab: React.FC<IProps> = ({ chillerData }) => {
  const {
    type = '',
    unit = '',
    companyName = '',
    facilityName = '',
    ChillerNo = '',
    weeklyHours,
    weeksPerYear,
    avgLoadProfile,
    desInletWaterTemp,
    make,
    model,
    serialNumber,
    manufacturedYear,
    refrigType,
    tons,
    efficiencyRating,
    energyCost,
    condDPDrop,
    condDPDropUnit,
    condAPDropUnit,
    condPressureUnit,
    condApproach,
    condDesignFlow,
    condDesignDeltaT,
    evapAPDropUnit,
    evapApproach,
    evapDOWTemp,
    evapDPDrop,
    evapDPDropUnit,
    evapDesignDeltaT,
    evapDesignFlow,
    evapPressureUnit,
    useEvapRefrigTemp,
    designVoltage,
    voltageChoice,
    ampChoice,
    fullLoadAmps,
    purgeReadingUnit,
    maxPurgeTime,
    havePurge,
    haveBearingTemp,
    compOPIndicator,
    userNote,
    numberOfCompressors,
    useRunHours,
    kwr
  } = chillerData || {};
  return (
    <Wrapper className="detailsTabWrap">
      {/* general */}
      <div className="viewChillerDetailsWrap">
        <h3 className="detailTabTitle themeColor">General</h3>
        <ul className="chillerDetailList">
          <Details
            detailsTitle="Type & Unit"
            detailsDescription={`${type} - ${unit}`}
            detailsIcon
          />
          <Details
            detailsTitle="Company Name"
            detailsDescription={companyName || '-'}
            detailsIcon
          />
          <Details detailsTitle="Facility" detailsDescription={facilityName || '-'} detailsIcon />
          <Details
            detailsTitle="Chiller Name/No"
            detailsDescription={ChillerNo || '-'}
            detailsIcon
          />
          <Details
            detailsTitle="Weekly Hours Of Operation"
            detailsDescription={weeklyHours?.toString() ? `${weeklyHours} Hrs.` : '-'}
            detailsIcon
          />
          <Details
            detailsTitle="Weeks Per Year"
            detailsDescription={weeksPerYear ?? '-'}
            detailsIcon
          />
          <Details
            detailsTitle="Avg. Load Profile"
            detailsDescription={avgLoadProfile?.toString() ? `${avgLoadProfile} %` : '-'}
            detailsIcon
          />
          <Details
            detailsTitle="Design Inlet Water Temp."
            detailsDescription={desInletWaterTemp || '-'}
            detailsIcon
          />
        </ul>
      </div>

      {/* name plate data */}
      <div className="viewChillerDetailsWrap">
        <h3 className="detailTabTitle themeColor">Name Plate Data</h3>
        <ul className="chillerDetailList">
          <Details detailsTitle="Make" detailsDescription={make || '-'} detailsIcon />
          <Details detailsTitle="Model" detailsDescription={model || '-'} detailsIcon />
          <Details detailsTitle="Serial No." detailsDescription={serialNumber || '-'} detailsIcon />
          <Details
            detailsTitle="Year Manufactured"
            detailsDescription={manufacturedYear || '-'}
            detailsIcon
          />
          <Details detailsTitle="Refrigerant Type" detailsDescription={refrigType} detailsIcon />
          <Details
            detailsTitle={unit === MEASUREMENT_UNITS?.[1]?.value ? 'KWR' : 'Tons'}
            detailsDescription={
              unit === MEASUREMENT_UNITS?.[1]?.value ? (kwr ?? '-') : (tons ?? '-')
            }
            detailsIcon
          />
          <Details
            detailsTitle="Efficiency Rating"
            detailsDescription={
              unit === MEASUREMENT_UNITS?.[1]?.value
                ? `${efficiencyRating ?? '-'} COP`
                : `${efficiencyRating ?? '-'} kw/ton`
            }
            detailsIcon
          />
          <Details
            detailsTitle="Energy Cost (kw. hr.)"
            detailsDescription={`${energyCost ?? '-'} USD`}
            detailsIcon
          />
        </ul>
      </div>

      {/* condensor */}
      <div className="viewChillerDetailsWrap">
        <h3 className="detailTabTitle themeColor">Condenser</h3>
        <ul className="chillerDetailList">
          <Details
            detailsTitle="Design Condenser Water Pressure Drop"
            detailsDescription={`${condDPDrop} ${condDPDropUnit}`}
            detailsIcon
          />
          <Details
            detailsTitle="Actual Condenser Water Pressure Drop Unit"
            detailsDescription={condAPDropUnit}
            detailsIcon
          />

          {/* below detail is for additional look alike figma dont remove it */}
          <Details
            className="extraDetails"
            detailsTitle="Condenser Pressure Unit"
            detailsDescription={condPressureUnit}
            detailsIcon
          />

          <Details
            detailsTitle="Design Condenser Approach Temp."
            detailsDescription={`${condApproach ?? '-'} ${unit === MEASUREMENT_UNITS?.[1]?.value ? '°C' : '℉'}`}
            detailsIcon
          />
          <Details
            detailsTitle="Design Condenser ∆ T"
            detailsDescription={condDesignDeltaT ?? '-'}
            detailsIcon
          />
          <Details
            detailsTitle="Design Condenser Flow"
            detailsDescription={condDesignFlow ?? '-'}
            detailsIcon
          />
        </ul>
      </div>

      {/* evaporator */}
      <div className="viewChillerDetailsWrap">
        <h3 className="detailTabTitle themeColor">Evaporator</h3>
        <ul className="chillerDetailList">
          <Details
            detailsTitle="Design Chill Water Pressure Drop"
            detailsDescription={`${evapDPDrop} ${evapDPDropUnit}`}
            detailsIcon
          />
          <Details
            detailsTitle="Actual Chill Water Pressure Drop Unit"
            detailsDescription={evapAPDropUnit}
            detailsIcon
          />
          <Details
            detailsTitle="Evaporator Pressure Unit"
            detailsDescription={evapPressureUnit}
            detailsIcon
          />

          {/* below detail is for additional look alike figma dont remove it */}
          <Details
            className={`extraDetails ${!useEvapRefrigTemp ? 'reqadoutsBoolean' : 'evaporatorBoolean'} commonBadge`}
            detailsTitle="Enter a Saturated Refrig. Temp.?"
            detailsDescription={useEvapRefrigTemp ? 'Yes' : 'No'}
            detailsIcon
          />

          <Details
            detailsTitle="Design Evaporator Approach Temp."
            detailsDescription={`${evapApproach ?? '-'} ${unit === MEASUREMENT_UNITS?.[1]?.value ? '°C' : '℉'}`}
            detailsIcon
          />
          <Details
            detailsTitle="Evaporator Design Outlet Water Temp."
            detailsDescription={`${evapDOWTemp ?? '-'} ${unit === MEASUREMENT_UNITS?.[1]?.value ? '°C' : '℉'}`}
            detailsIcon
          />
          <Details
            detailsTitle="Evaporator Design ∆ T"
            detailsDescription={`${evapDesignDeltaT ?? '-'} ${unit === MEASUREMENT_UNITS?.[1]?.value ? '°C' : '℉'}`}
            detailsIcon
          />

          {/* below detail is for additional look alike figma dont remove it */}
          <Details
            className="extraDetails"
            detailsTitle="Evaporator Design Flow"
            detailsDescription={evapDesignFlow ?? '-'}
            detailsIcon
          />
        </ul>
      </div>

      {/* electrical */}
      <div className="viewChillerDetailsWrap">
        <h3 className="detailTabTitle themeColor">Electrical</h3>
        <ul className="chillerDetailList">
          <Details
            detailsTitle="Design Voltage"
            detailsDescription={designVoltage ?? '-'}
            detailsIcon
          />
          <Details
            detailsTitle="Voltage Choice"
            detailsDescription={voltageChoice || '-'}
            detailsIcon
          />
          <Details
            detailsTitle="Full-Load Amperage"
            detailsDescription={fullLoadAmps ?? '-'}
            detailsIcon
          />
          <Details
            detailsTitle="Amperage Choice"
            detailsDescription={ampChoice || '-'}
            detailsIcon
          />
        </ul>
      </div>

      {/* reqadouts */}
      <div className="viewChillerDetailsWrap">
        <h3 className="detailTabTitle themeColor">Readouts</h3>
        <ul className="chillerDetailList">
          <Details
            detailsTitle="Purge Total Pumpout Time Readout On Chiller?"
            detailsDescription={havePurge ? 'Yes' : 'No'}
            detailsIcon
            className={`${!havePurge ? 'reqadoutsBoolean' : 'evaporatorBoolean'} commonBadge`}
          />
          <Details
            detailsTitle="Purge Total Pumpout Time Measured In What Units?"
            detailsDescription={purgeReadingUnit || '-'}
            detailsIcon
            className="reqadoutsHrMin commonBadge"
          />

          {/* below two details are for additional look alike figma dont remove it */}
          <Details
            className="extraDetails"
            detailsTitle="Max. Daily Purge Total Pumpout Time Before Alert"
            detailsDescription={maxPurgeTime ?? '-'}
            detailsIcon
          />

          <Details
            detailsTitle="Readout For Bearing Temp.?"
            detailsDescription={haveBearingTemp ? 'Yes' : 'No'}
            detailsIcon
            className={`${!haveBearingTemp ? 'reqadoutsBoolean' : 'evaporatorBoolean'} commonBadge`}
          />
        </ul>
      </div>

      {/* Additional Info */}
      <div className="viewChillerDetailsWrap">
        <h3 className="detailTabTitle themeColor">Additional Info</h3>
        <ul className="chillerDetailList">
          <Details
            detailsTitle="Oil Pressure Differential"
            detailsDescription={compOPIndicator || '-'}
            detailsIcon
          />
          <Details
            detailsTitle="Calculate Efficiency Using"
            detailsDescription={useRunHours || '-'}
            detailsIcon
          />
          <Details
            detailsTitle="Number of Compressors"
            detailsDescription={numberOfCompressors ?? '-'}
            detailsIcon
          />
          <Details detailsTitle="User Notes" detailsDescription={userNote || '-'} detailsIcon />
        </ul>
      </div>
    </Wrapper>
  );
};

export default DetailsTab;
