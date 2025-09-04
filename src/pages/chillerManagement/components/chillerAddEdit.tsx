import React, { useEffect, useMemo } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { PlusOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Form } from 'antd';

import { chillerHooks, chillerQueryKeys } from '@/services/chiller';
import { companyHooks, companyQueryKeys } from '@/services/company';
import { dashboardQueryKey } from '@/services/dashboard';
import { facilityHooks, facilityQueryKeys } from '@/services/facility';
import { logQueryKeys } from '@/services/log';
import { maintenanceQueryKey } from '@/services/maintenance';
import { reportQueryKey } from '@/services/report';
import { userQueryKeys } from '@/services/user';

import { authStore } from '@/store/auth';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { MEASUREMENT_UNITS } from '@/shared/constants';
import { capitalizeFirstLetter, showToaster } from '@/shared/utils/functions';

import { Wrapper } from '../style';
import AdditionalInfoForm from './AdditionalInfoForm';
import CondensorForm from './CondensorForm';
import ElectricalForm from './ElectricalForm';
import EvaporatorForm from './EvaporatorForm';
import GeneralForm from './GeneralForm';
import NamePlateForm from './NamePlateForm';
import ReadoutsForm from './ReadoutsForm';

interface IFormValues {
  companyId: string;
  facilityId: string;
  unit: string;
  chillerNo: string;
  weeklyHours: string;
  weeksPerYear: string;
  avgLoadProfile: string;
  designInletWaterTemp: string;
  type: string;
  make: string;
  model: string;
  serialNo: string;
  yearManufactured: string;
  refrigerantType: string;
  'tons/kwr': string;
  efficiencyRating: string;
  energyCost: string;
  condenserWaterPressureDrop?: string;
  condenserWaterPressureDropOption?: string;
  actualCondenserWaterPressureDrop: string;
  condenserPressureUnit: string;
  designCondenserApproachTemp: string;
  designCondenserT: string;
  designCondenserFlow: string;
  chillWaterPressureDrop?: string;
  chillWaterPressureDropOption?: string;
  actualChillWaterPressureDropUnit: string;
  evaporatorPressureUnit: string;
  saturatedRefrigerantTemp: boolean;
  designEvaporatorApproachTemp?: string;
  evaporatorDesignOutletWaterTemp: string;
  evaporatorDesignT: string;
  designEvaporatorFlow: string;
  designVoltage: string;
  voltageChoice: string;
  fullLoadAmperage: string;
  amperageChoice: string;
  pumpOutTimeReadout: boolean;
  purgePumpOutReading: string;
  maxDailyPurge: string;
  bearingTemp: boolean;
  oilPressureDifferential: string;
  calculateEfficiencyUsing: string;
  noOfCompressors: string;
  userNotes?: string;
  emissionFactor: string;
  ChillerNumber: string;
}

const ChillerAddEditForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { userData } = authStore((state) => state);
  const [form] = Form.useForm();

  const { data: companyList, isLoading: isCompanyLoading } = companyHooks.AllCompanyList();
  const { mutate: addChillerAction, isPending } = chillerHooks.useAddChiller();
  const { mutate: editChillerAction, isPending: isEditPending } = chillerHooks.useEditChiller();

  const { data: chillerData, isLoading } = chillerHooks.ChillerView(id!);

  const companyName = Form.useWatch('companyId', form);
  const unit = Form.useWatch('unit', form);

  const { data: facilityList, isLoading: isFacilityLoading } =
    facilityHooks.AllFacilityListByCompany(companyName);

  useEffect(() => {
    if (userData?.companyId && !isCompanyLoading) {
      form.setFieldValue('companyId', userData?.companyId);
    }
  }, [form, id, isCompanyLoading, userData?.companyId]);

  useEffect(() => {
    if (!id || !chillerData) return;

    form.setFieldsValue({
      companyId: chillerData?.companyId,
      facilityId: chillerData?.facilityId,
      type: chillerData?.type,
      unit: chillerData?.unit,
      chillerNo: chillerData?.ChillerNo,
      weeklyHours: chillerData?.weeklyHours?.toString(),
      weeksPerYear: chillerData?.weeksPerYear?.toString(),
      avgLoadProfile: chillerData?.avgLoadProfile?.toString(),
      designInletWaterTemp: chillerData?.desInletWaterTemp,
      make: chillerData?.make,
      model: chillerData?.model,
      serialNo: chillerData?.serialNumber,
      yearManufactured: chillerData?.manufacturedYear?.toString(),
      refrigerantType: chillerData?.refrigType,
      'tons/kwr':
        chillerData?.unit === MEASUREMENT_UNITS?.[0]?.value
          ? chillerData?.tons?.toString()
          : chillerData?.kwr?.toString(),
      efficiencyRating: chillerData?.efficiencyRating?.toString(),
      energyCost: chillerData?.energyCost?.toString(),
      condenserWaterPressureDrop: chillerData?.condDPDrop?.toString(),
      condenserWaterPressureDropOption: chillerData?.condDPDropUnit,
      actualCondenserWaterPressureDrop: chillerData?.condAPDropUnit,
      condenserPressureUnit: chillerData?.condPressureUnit,
      designCondenserApproachTemp: chillerData?.condApproach?.toString(),
      designCondenserT: chillerData?.condDesignDeltaT?.toString(),
      designCondenserFlow: chillerData?.condDesignFlow?.toString(),
      chillWaterPressureDrop: chillerData?.evapDPDrop?.toString(),
      chillWaterPressureDropOption: chillerData?.evapDPDropUnit,
      actualChillWaterPressureDropUnit: chillerData?.evapAPDropUnit,
      evaporatorPressureUnit: chillerData?.evapPressureUnit,
      saturatedRefrigerantTemp: chillerData?.useEvapRefrigTemp,
      designEvaporatorApproachTemp: chillerData?.evapApproach?.toString(),
      evaporatorDesignOutletWaterTemp: chillerData?.evapDOWTemp?.toString(),
      evaporatorDesignT: chillerData?.evapDesignDeltaT?.toString(),
      designEvaporatorFlow: chillerData?.evapDesignFlow?.toString(),
      designVoltage: chillerData?.designVoltage?.toString(),
      voltageChoice: chillerData?.voltageChoice,
      fullLoadAmperage: chillerData?.fullLoadAmps?.toString(),
      amperageChoice: chillerData?.ampChoice,
      pumpOutTimeReadout: chillerData?.havePurge,
      purgePumpOutReading: chillerData?.purgeReadingUnit,
      maxDailyPurge: chillerData?.maxPurgeTime?.toString(),
      bearingTemp: chillerData?.haveBearingTemp,
      oilPressureDifferential: chillerData?.compOPIndicator,
      calculateEfficiencyUsing: chillerData?.useRunHours,
      noOfCompressors: chillerData?.numberOfCompressors?.toString(),
      userNotes: chillerData?.userNote,
      emissionFactor: chillerData?.emissionFactor?.toString(),
      ChillerNumber: chillerData?.ChillerNumber
    });
  }, [chillerData, form, id]);

  const companyOptions = useMemo(() => {
    return (
      companyList?.map((company) => ({
        label: capitalizeFirstLetter(company?.name),
        value: company?._id
      })) || []
    );
  }, [companyList]);

  const facilityOptions = useMemo(() => {
    return (
      facilityList?.map((facility) => ({
        label: capitalizeFirstLetter(facility?.name),
        value: facility?._id
      })) || []
    );
  }, [facilityList]);

  const handleSuccess = (message: string) => {
    showToaster('success', message);
    queryClient.invalidateQueries({ queryKey: facilityQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: companyQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: userQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: chillerQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: logQueryKeys.all });
    queryClient.invalidateQueries({ queryKey: maintenanceQueryKey.all });
    queryClient.invalidateQueries({ queryKey: reportQueryKey.all });
    queryClient.invalidateQueries({ queryKey: dashboardQueryKey.all });
    navigate(-1);
  };

  const handleError = (err: any) => {
    const errorMsg = err?.message || err?.message?.[0] || 'Something went wrong';
    showToaster('error', errorMsg);
  };

  const onSubmit = (values: IFormValues) => {
    const payload = {
      companyId: values?.companyId,
      facilityId: values?.facilityId,
      unit: values?.unit,
      ChillerNo: values?.chillerNo,
      weeklyHours: Number(values?.weeklyHours),
      weeksPerYear: Number(values?.weeksPerYear),
      avgLoadProfile: Number(values?.avgLoadProfile),
      desInletWaterTemp: values?.designInletWaterTemp,
      make: values?.make,
      model: values?.model,
      serialNumber: values?.serialNo,
      manufacturedYear: Number(values?.yearManufactured),
      refrigType: values?.refrigerantType,
      tons: values?.unit === MEASUREMENT_UNITS?.[0]?.value ? Number(values?.['tons/kwr']) : null,
      kwr: values?.unit === MEASUREMENT_UNITS?.[1]?.value ? Number(values?.['tons/kwr']) : null,
      efficiencyRating: Number(values?.efficiencyRating),
      energyCost: Number(values?.energyCost),
      designVoltage: Number(values?.designVoltage),
      voltageChoice: values?.voltageChoice,
      fullLoadAmps: Number(values?.fullLoadAmperage),
      ampChoice: values?.amperageChoice,
      havePurge: values?.pumpOutTimeReadout,
      maxPurgeTime: Number(values?.maxDailyPurge),
      purgeReadingUnit: values?.purgePumpOutReading,
      haveBearingTemp: values?.bearingTemp,
      userNote: values?.userNotes || null,
      numberOfCompressors: Number(values?.noOfCompressors),
      compOPIndicator: values?.oilPressureDifferential,
      useRunHours: values?.calculateEfficiencyUsing,
      condDPDrop: values.condenserWaterPressureDrop
        ? Number(values?.condenserWaterPressureDrop)
        : null,
      condDPDropUnit: values?.condenserWaterPressureDropOption || null,
      condPressureUnit: values?.condenserPressureUnit,
      condAPDropUnit: values?.actualCondenserWaterPressureDrop,
      condApproach: Number(values?.designCondenserApproachTemp),
      condDesignDeltaT: Number(values?.designCondenserT),
      condDesignFlow: Number(values?.designCondenserFlow),
      evapDPDrop: values?.chillWaterPressureDrop ? Number(values?.chillWaterPressureDrop) : null,
      evapDPDropUnit: values?.chillWaterPressureDropOption || null,
      evapAPDropUnit: values?.actualChillWaterPressureDropUnit,
      evapPressureUnit: values?.evaporatorPressureUnit,
      useEvapRefrigTemp: values?.saturatedRefrigerantTemp,
      evapApproach: values?.designEvaporatorApproachTemp
        ? Number(values?.designEvaporatorApproachTemp)
        : null,
      evapDOWTemp: Number(values?.evaporatorDesignOutletWaterTemp),
      evapDesignDeltaT: Number(values?.evaporatorDesignT),
      evapDesignFlow: Number(values?.designEvaporatorFlow),
      emissionFactor: Number(values?.emissionFactor),
      ChillerNumber: values?.ChillerNumber || ''
    };
    if (id) {
      editChillerAction(
        { ...payload, id: id },
        {
          onSuccess: (res) => handleSuccess(res?.message || ''),
          onError: handleError
        }
      );
    } else {
      addChillerAction(payload, {
        onSuccess: (res) => handleSuccess(res?.message || ''),
        onError: handleError
      });
    }
  };

  return (
    <Wrapper>
      {isLoading && <Loader />}
      <Form form={form} onFinish={onSubmit} disabled={isPending || isLoading || isEditPending}>
        <HeaderToolbar
          title={id ? 'Edit Chiller' : 'Add Chiller'}
          className="addEditHeader userAddEditHeader"
          backBtn={true}
          button={
            <div className="editButtonWrap">
              <Button
                disabled={isPending || isLoading || isEditPending}
                className="title-cancel-btn"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                disabled={isPending || isLoading || isEditPending}
                loading={isPending || isEditPending}
                type="primary"
                shape="round"
                htmlType="submit"
                icon={!id && <PlusOutlined />}
                className="title-btn"
              >
                {id ? 'Save' : 'Add / Save'}
              </Button>
            </div>
          }
        />
        <div className="shadowWrap">
          {/* general form */}
          <ShadowPaper>
            <div className="chillerAddEditHeader">
              <h2 className="themeColor">General</h2>
            </div>
            <GeneralForm
              companyOptions={companyOptions || []}
              isCompanyLoading={isCompanyLoading}
              companyName={companyName}
              facilityOptions={
                id && chillerData?.facilityId
                  ? [{ label: chillerData?.facilityName, value: chillerData?.facilityId }]
                  : facilityOptions || []
              }
              isFacilityLoading={isFacilityLoading}
              form={form}
              id={id || ''}
            />
          </ShadowPaper>

          {/* name plate data form */}
          <ShadowPaper>
            <div className="chillerAddEditHeader">
              <h2 className="themeColor">Name Plate Data</h2>
            </div>
            <NamePlateForm unit={unit} />
          </ShadowPaper>

          {/* condenser form */}
          <ShadowPaper>
            <div className="chillerAddEditHeader">
              <h2 className="themeColor">Condenser</h2>
            </div>
            <CondensorForm unit={unit} />
          </ShadowPaper>

          {/* Evaporator form */}
          <ShadowPaper>
            <div className="chillerAddEditHeader">
              <h2 className="themeColor">Evaporator</h2>
            </div>
            <EvaporatorForm unit={unit} />
          </ShadowPaper>

          {/* Electrical form */}
          <ShadowPaper>
            <div className="chillerAddEditHeader">
              <h2 className="themeColor">Electrical</h2>
            </div>
            <ElectricalForm />
          </ShadowPaper>

          {/* Readouts form */}
          <ShadowPaper>
            <div className="chillerAddEditHeader">
              <h2 className="themeColor">Readouts</h2>
            </div>
            <ReadoutsForm />
          </ShadowPaper>

          {/* Additional Info form */}
          <ShadowPaper>
            <div className="chillerAddEditHeader">
              <h2 className="themeColor">Additional Info</h2>
            </div>
            <AdditionalInfoForm />
          </ShadowPaper>
          <div className="editButtonWrap extraActionButton">
            <Button
              disabled={isPending || isLoading || isEditPending}
              className="title-cancel-btn"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              disabled={isPending || isLoading || isEditPending}
              loading={isPending || isEditPending}
              type="primary"
              shape="round"
              htmlType="submit"
              icon={!id && <PlusOutlined />}
              className="title-btn"
            >
              {id ? 'Save' : 'Add / Save'}
            </Button>
          </div>
        </div>
      </Form>
    </Wrapper>
  );
};

export default ChillerAddEditForm;
