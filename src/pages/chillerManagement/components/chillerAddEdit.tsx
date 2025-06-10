import React from 'react';

import ShadowPaper from '@/shared/components/common/ShadowPaper';

import { Wrapper } from '../style';
import AdditionalInfoForm from './AdditionalInfoForm';
import CondensorForm from './CondensorForm';
import ElectricalForm from './ElectricalForm';
import EvaporatorForm from './EvaporatorForm';
import GeneralForm from './GeneralForm';
import NamePlateForm from './NamePlateForm';
import ReadoutsForm from './ReadoutsForm';

const ChillerAddEditForm: React.FC = () => {
  return (
    <Wrapper>
      {/* general form */}
      <ShadowPaper>
        <div className="chillerAddEditHeader">
          <h2>General</h2>
        </div>
        <GeneralForm />
      </ShadowPaper>

      {/* name plate data form */}
      <ShadowPaper>
        <div className="chillerAddEditHeader">
          <h2>Name Plate Data</h2>
        </div>
        <NamePlateForm />
      </ShadowPaper>

      {/* condenser form */}
      <ShadowPaper>
        <div className="chillerAddEditHeader">
          <h2>Condensor</h2>
        </div>
        <CondensorForm />
      </ShadowPaper>

      {/* Evaporator form */}
      <ShadowPaper>
        <div className="chillerAddEditHeader">
          <h2>Evaporator</h2>
        </div>
        <EvaporatorForm />
      </ShadowPaper>

      {/* Electrical form */}
      <ShadowPaper>
        <div className="chillerAddEditHeader">
          <h2>Electrical</h2>
        </div>
        <ElectricalForm />
      </ShadowPaper>

      {/* Readouts form */}
      <ShadowPaper>
        <div className="chillerAddEditHeader">
          <h2>Readouts</h2>
        </div>
        <ReadoutsForm />
      </ShadowPaper>

      {/* Additional Info form */}
      <ShadowPaper>
        <div className="chillerAddEditHeader">
          <h2>Additional Info</h2>
        </div>
        <AdditionalInfoForm />
      </ShadowPaper>
    </Wrapper>
  );
};

export default ChillerAddEditForm;
