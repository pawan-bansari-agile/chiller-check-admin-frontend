import React from 'react';

import Details from '@/shared/components/common/Details';

import { Wrapper } from '../style';

const DetailsTab: React.FC = () => {
  return (
    <Wrapper className="detailsTabWrap">
      {/* general */}
      <div className="viewChillerDetailsWrap">
        <h3 className="detailTabTitle">General</h3>
        <ul className="chillerDetailList">
          <Details
            detailsTitle="Type & Unit"
            detailsDescription="Electric - US/English"
            detailsIcon
          />
          <Details detailsTitle="Company Name" detailsDescription="Johnzeneterprise" detailsIcon />
          <Details detailsTitle="Facility" detailsDescription="John eliza" detailsIcon />
          <Details detailsTitle="Chiller Name/No" detailsDescription="CryoStream 20" detailsIcon />
          <Details
            detailsTitle="Weekly Hours Of Operation"
            detailsDescription="168 Hrs."
            detailsIcon
          />
          <Details detailsTitle="Weeks Per Year" detailsDescription="30" detailsIcon />
          <Details detailsTitle="Avg. Load Profile" detailsDescription="75 %" detailsIcon />
          <Details
            detailsTitle="Design Inlet Water Temp."
            detailsDescription="85°F / 29.44°C"
            detailsIcon
          />
        </ul>
      </div>

      {/* name plate data */}
      <div className="viewChillerDetailsWrap">
        <h3 className="detailTabTitle">Name Plate Data</h3>
        <ul className="chillerDetailList">
          <Details detailsTitle="Make" detailsDescription="Trane" detailsIcon />
          <Details detailsTitle="Model" detailsDescription="CVHF128FA" detailsIcon />
          <Details detailsTitle="Serial No." detailsDescription="L94K01466" detailsIcon />
          <Details detailsTitle="Year Manufactured" detailsDescription="1994" detailsIcon />
          <Details detailsTitle="Refrigerant Type" detailsDescription="R-123" detailsIcon />
          <Details detailsTitle="Tons" detailsDescription="1000" detailsIcon />
          <Details detailsTitle="Efficiency Rating" detailsDescription="0.55 kw/ton" detailsIcon />
          <Details detailsTitle="Energy Cost (kw. hr.)" detailsDescription="0.04 USD" detailsIcon />
        </ul>
      </div>

      {/* condensor */}
      <div className="viewChillerDetailsWrap">
        <h3 className="detailTabTitle">Condenser</h3>
        <ul className="chillerDetailList">
          <Details detailsTitle="Energy Cost (kw. hr.)" detailsDescription="0.04 USD" detailsIcon />
          <Details
            detailsTitle="Weekly Hours Of Operation"
            detailsDescription="168 Hrs."
            detailsIcon
          />
          <Details detailsTitle="Weeks Per Year" detailsDescription="30" detailsIcon />

          {/* below detail is for additional look alike figma dont remove it */}
          <Details className="extraDetails" detailsTitle="" detailsDescription="" detailsIcon />

          <Details detailsTitle="Energy Cost (kw. hr.)" detailsDescription="0.04 USD" detailsIcon />
          <Details detailsTitle="Weekly Hours Of Operation" detailsDescription="1000" detailsIcon />
          <Details detailsTitle="Weeks Per Year" detailsDescription="30" detailsIcon />
        </ul>
      </div>

      {/* evaporator */}
      <div className="viewChillerDetailsWrap">
        <h3 className="detailTabTitle">Evaporator</h3>
        <ul className="chillerDetailList">
          <Details
            detailsTitle="Design Chill Water Pressure Drop"
            detailsDescription="12.100000038147 Feet"
            detailsIcon
          />
          <Details
            detailsTitle="Actual Chill Water Pressure Drop Unit"
            detailsDescription="PSIG"
            detailsIcon
          />
          <Details detailsTitle="Evaporator Pressure Unit" detailsDescription="PSIG" detailsIcon />

          {/* below detail is for additional look alike figma dont remove it */}
          <Details className="extraDetails" detailsTitle="" detailsDescription="" detailsIcon />

          <Details
            detailsTitle="Enter a Saturated Refrig. Temp.?"
            detailsDescription="Yes"
            detailsIcon
            className="evaporatorBoolean commonBadge"
          />
          <Details
            detailsTitle="Design Evaporator Approach Temp."
            detailsDescription="-"
            detailsIcon
          />
          <Details
            detailsTitle="Evaporator Design Outlet Water Temp."
            detailsDescription="-"
            detailsIcon
          />

          {/* below detail is for additional look alike figma dont remove it */}
          <Details className="extraDetails" detailsTitle="" detailsDescription="" detailsIcon />

          <Details detailsTitle="Evaporator Design ∆ T" detailsDescription="-" detailsIcon />
          <Details detailsTitle="Evaporator Design Flow" detailsDescription="-" detailsIcon />
        </ul>
      </div>

      {/* electrical */}
      <div className="viewChillerDetailsWrap">
        <h3 className="detailTabTitle">Electrical</h3>
        <ul className="chillerDetailList">
          <Details detailsTitle="Design Voltage" detailsDescription="40" detailsIcon />
          <Details
            detailsTitle="Voltage Choice"
            detailsDescription="Do Not Log Voltage"
            detailsIcon
          />
          <Details detailsTitle="Full-Load Amperage" detailsDescription="20" detailsIcon />
          <Details
            detailsTitle="Amperage Choice"
            detailsDescription="Enter Load Directly"
            detailsIcon
          />
        </ul>
      </div>

      {/* reqadouts */}
      <div className="viewChillerDetailsWrap">
        <h3 className="detailTabTitle">Readouts</h3>
        <ul className="chillerDetailList">
          <Details
            detailsTitle="Enter a Saturated Refrig. Temp.?"
            detailsDescription="No"
            detailsIcon
            className="reqadoutsBoolean commonBadge"
          />
          <Details
            detailsTitle="Design Evaporator Approach Temp."
            detailsDescription="Hrs. & Min."
            detailsIcon
            className="reqadoutsHrMin commonBadge"
          />

          {/* below two details are for additional look alike figma dont remove it */}
          <Details className="extraDetails" detailsTitle="" detailsDescription="" detailsIcon />
          <Details className="extraDetails" detailsTitle="" detailsDescription="" detailsIcon />

          <Details
            detailsTitle="Design Evaporator Approach Temp."
            detailsDescription="0 min"
            detailsIcon
          />
          <Details
            detailsTitle="Design Evaporator Approach Temp."
            detailsDescription="No"
            detailsIcon
            className="reqadoutsBoolean commonBadge"
          />
        </ul>
      </div>

      {/* Additional Info */}
      <div className="viewChillerDetailsWrap">
        <h3 className="detailTabTitle">Additional Info</h3>
        <ul className="chillerDetailList">
          <Details
            detailsTitle="Oil Pressure Differential"
            detailsDescription="Do Not Log Tube System"
            detailsIcon
          />
          <Details
            detailsTitle="Calculate Efficiency Using"
            detailsDescription="Run Hours"
            detailsIcon
          />
          <Details detailsTitle="Number of Compressors" detailsDescription="2" detailsIcon />

          {/* below detail is for additional look alike figma dont remove it */}
          <Details className="extraDetails" detailsTitle="" detailsDescription="" detailsIcon />

          <Details
            detailsTitle="User Notes"
            detailsDescription="This is a test entry."
            detailsIcon
          />
        </ul>
      </div>
    </Wrapper>
  );
};

export default DetailsTab;
