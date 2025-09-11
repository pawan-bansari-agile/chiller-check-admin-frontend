import React, { useMemo, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { DashboardOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { dashboardHooks } from '@/services/dashboard';
import {
  EfficiencyAlert,
  Metrics,
  Performance,
  PerformanceSummary
} from '@/services/dashboard/types';

import { RenderCheckboxInput } from '@/shared/components/common/FormField';
import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import { Loader } from '@/shared/components/common/Loader';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { TimezoneEnum } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';

import CompanySelectorDropdown from '../component/CompanySelectorDropdown';
import { Wrapper } from '../style';

dayjs.extend(utc);
dayjs.extend(timezone);

interface ChillerLog extends EfficiencyAlert {
  isGlobal?: boolean;
}

// ====== Constants & Helpers ======
const labels: Record<string, string> = {
  thisYTD: 'This YTD',
  lastYTD: 'Last YTD',
  last12Months: 'Last 12 Months'
};

const formatPercentage = (value?: number | null) => (value != null ? `${value} %` : '-');

const formatDollar = (value?: number | null) =>
  value != null ? `$ ${value?.toLocaleString('en-US')}` : '-';

const getClassName = (value?: number | null) => {
  if (value == null) return '';
  if (value >= 10) return 'legendWrap effLossLegend';
  if (value >= 2 && value < 10) return 'legendWrap nonCondenseLegend';
  return '';
};

const convertUtcToTimezone = (
  utcDate?: string | null,
  targetZone: string = 'UTC',
  formatType: 'Date' | 'Time' = 'Date'
) => {
  if (!utcDate) return '';
  const tz = TimezoneEnum[targetZone as keyof typeof TimezoneEnum] || TimezoneEnum.EST;
  const date = dayjs.utc(utcDate).tz(tz);
  return date.format(formatType === 'Date' ? 'MM/DD/YY' : 'hh:mm A');
};

// ====== Reusable Components ======
const PerformanceRow: React.FC<{ label: string; values?: Metrics }> = ({ label, values }) => (
  <div className="valueWrap">
    <div>{label}</div>
    <div>{formatPercentage(values?.averageLoss)}</div>
    <div>{formatDollar(values?.targetCost)}</div>
    <div>{formatDollar(values?.actualCost)}</div>
    <div>{formatDollar(values?.lossCost)}</div>
    <div>{values?.kwhLoss?.toLocaleString('en-US') ?? '-'}</div>
    <div>{values?.btuLoss?.toLocaleString('en-US') ?? '-'}</div>
    <div>{values?.co2?.toLocaleString('en-US') ?? '-'}</div>
  </div>
);

const ChillerLogRow: React.FC<ChillerLog> = ({
  _id,
  ChillerNo,
  chillerId,
  logId,
  facilityTimezone,
  readingDateUTC,
  effLoss,
  condAppLoss,
  evapAppLoss,
  nonCondLoss,
  otherLoss,
  isGlobal = false,
  facilityName
}) => {
  const navigate = useNavigate();
  return (
    <div key={_id} className="valueWrap">
      {isGlobal && <div>{facilityName || '-'}</div>}
      {!isGlobal && (
        <div>
          <span
            className="dashboardIcon"
            onClick={() => navigate(ROUTES.View_CHILLER_MANAGEMENT(chillerId))}
          >
            <DashboardOutlined />
          </span>
        </div>
      )}
      <div>
        <Link className="chillerNavigate" to={ROUTES.View_CHILLER_MANAGEMENT(chillerId)}>
          {ChillerNo || '-'}
        </Link>
      </div>
      <div className="timeValueWrap" onClick={() => navigate(ROUTES.VIEW_LOG_ENTRY(logId))}>
        <span>{convertUtcToTimezone(readingDateUTC, facilityTimezone, 'Date')}</span>
        <span>{convertUtcToTimezone(readingDateUTC, facilityTimezone, 'Time')}</span>
      </div>
      {[effLoss, condAppLoss, evapAppLoss, nonCondLoss, otherLoss].map((v, idx) => (
        <div key={idx}>
          <span
            style={v >= 2 && v < 10 ? { color: 'black' } : undefined}
            className={getClassName(v)}
          >
            {formatPercentage(v)}
          </span>
        </div>
      ))}
    </div>
  );
};

// ====== Dashboard Component ======
const Dashboard: React.FC = () => {
  const [hideFacility, setHideFacility] = useState(false);
  const [companyId, setCompanyId] = useState('');
  const { data, isLoading } = dashboardHooks.DashboardDetails(companyId);

  const staticKeys: (keyof PerformanceSummary)[] = ['thisYTD', 'lastYTD', 'last12Months'];

  const yearKeys = useMemo(
    () => Object.keys(data?.performanceSummary || {}).filter((k) => !staticKeys.includes(k as any)),
    [data?.performanceSummary]
  );

  return (
    <Wrapper>
      {isLoading && <Loader />}
      <Meta title="Dashboard" />
      <HeaderToolbar
        title="dashboard"
        button={<CompanySelectorDropdown setCompanyId={setCompanyId} />}
      />
      <div className="shadowPaperWrap">
        {/* ===== Efficiency Alert Legend ===== */}
        <ShadowPaper>
          <ul className="dashboardEffList">
            <li>ALERT KEY: 2-9%</li>
            <li>
              EFFICIENCY LOSS: <span className="effLegends"></span>
            </li>
            <li>
              10%+ EFFICIENCY LOSS: <span className="effLegends effLossLegends"></span>
            </li>
          </ul>
        </ShadowPaper>

        {/* ===== Global Efficiency Alerts ===== */}
        <div className="charityCard">
          <div className="issueHeader">
            <h2 className="themeColor">Efficiency Loss &gt; 10%</h2>
          </div>
          <div className="scrollDiv">
            <div className="consumptionChart">
              <div className="labelWrap">
                <span>Facility</span>
                <span>Chiller</span>
                <span>View Log</span>
                <span>Eff. Loss</span>
                <span>Cond. App. Loss</span>
                <span>Evap. App. Loss</span>
                <span>Non- Cond. Loss</span>
                <span>Other Losses</span>
              </div>
              {data?.efficiencyAlerts?.length ? (
                data?.efficiencyAlerts?.map((log) => (
                  <ChillerLogRow key={log._id} {...log} isGlobal />
                ))
              ) : (
                <div className="no-data">No Data Found</div>
              )}
            </div>
          </div>
        </div>

        {/* ===== Company-wide Performance Summary ===== */}
        <div className="charityCard">
          <div className="issueHeader">
            <h2 className="themeColor">Performance Summary for Your Company's Chillers</h2>
          </div>
          <div className="scrollDiv">
            <div className="consumptionChart performaceSummaryChartDashboard">
              <div className="labelWrap">
                <span></span>
                <span>Avg. Eff. Loss</span>
                <span>Total Target Cost at Average Load Profile</span>
                <span>Total Actual Cost at Average Load Profile</span>
                <span>Estimated $ Loss</span>
                <span>Estimated kWh Loss</span>
                <span>Estimated BTU Loss</span>
                <span>
                  Estimated kg of CO2e Created
                  <Tooltip
                    placement="leftTop"
                    title="CO2e is a standardized unit of measurement that combines the warming impact of all greenhouse gases, including: Carbon Dioxide (CO2), Methane (CH4), Nitrous Oxide (N2O) and Fluorinated gases (like HFCs, PFCs, and SF6). Each of these gases has a different Global Warming Potential (GWP), which is a measure of how much heat it traps in the atmosphere compared to a similar amount of CO2 over a specific period (usually 100 years). Using CO2e converts the emissions of these more potent gases into an equivalent amount of CO2. This allows for a single, uniform metric to compare the total climate impact from various sources. CO2e is used for calculating and reporting a total carbon footprint for a company, a product, or a country."
                  >
                    <InfoCircleOutlined style={{ marginLeft: 4, color: '#000ABC' }} />
                  </Tooltip>
                </span>
              </div>
              {staticKeys?.map((key) => (
                <PerformanceRow
                  key={key}
                  label={labels[key]}
                  values={data?.performanceSummary?.[key]}
                />
              ))}
              {yearKeys
                ?.sort((a, b) => Number(b) - Number(a))
                ?.map((year) => (
                  <PerformanceRow
                    key={year}
                    label={year}
                    values={data?.performanceSummary?.[year]}
                  />
                ))}
            </div>
          </div>
        </div>

        {/* ===== Toggle Facility Summaries ===== */}
        {data?.facilityWisePerformance?.length ? (
          <ShadowPaper>
            <RenderCheckboxInput
              inputProps={{ onChange: (e) => setHideFacility(e.target.checked) }}
              colClassName="locationPerformanceCheckbox"
            >
              <span className="checkboxLocation">Hide Location Performance Summaries</span>
            </RenderCheckboxInput>
          </ShadowPaper>
        ) : null}

        {/* ===== Facility-wise Details ===== */}
        {data?.facilityWiseChillerLogs?.map((facility) => {
          const perfData = data?.facilityWisePerformance?.find(
            (p) => p.facilityId === facility.facilityId
          );
          const facilitySummary = perfData?.performance;
          const facilityStaticKeys: (keyof Performance)[] = ['thisYTD', 'lastYTD', 'last12Months'];
          const facilityYearKeys = Object.keys(facilitySummary || {}).filter(
            (k) => !facilityStaticKeys.includes(k as any)
          );

          return (
            <div key={facility?.facilityId} className="charityCard">
              <div className="issueHeader facilityHeader">
                <h2 className="themeColor">Facility - {facility?.facilityName || '-'}</h2>
              </div>

              {/* Facility Chiller Logs */}
              <div className="scrollDiv">
                <h2 className="themeColor chiller-title">Chillers</h2>
                <div className="consumptionChart mainBuildingDashboard">
                  <div className="labelWrap">
                    <span>Dashboard</span>
                    <span>Chiller</span>
                    <span>View Log</span>
                    <span>Eff. Loss</span>
                    <span>Cond. App. Loss</span>
                    <span>Evap. App. Loss</span>
                    <span>Non- Cond. Loss</span>
                    <span>Other Losses</span>
                  </div>
                  {facility?.chillerLogs?.length ? (
                    facility?.chillerLogs?.map((log) => (
                      <ChillerLogRow
                        key={log._id}
                        facilityTimezone={facility?.facilityTimezone}
                        {...log}
                      />
                    ))
                  ) : (
                    <div className="no-data">No Data Found</div>
                  )}
                </div>
              </div>

              {/* Facility Performance Summary */}
              {perfData && !hideFacility && (
                <>
                  <div className="facilityIssueHeader">
                    <h2 className="themeColor">Facility Performance</h2>
                  </div>
                  <div className="scrollDiv">
                    <div className="consumptionChart facilityPerformanceChartDashboard">
                      <div className="labelWrap">
                        <span></span>
                        <span>Avg. Eff. Loss</span>
                        <span>Total Target Cost</span>
                        <span>Total Actual Cost</span>
                        <span>Estimated $ Loss</span>
                        <span>Estimated kWh Loss</span>
                        <span>Estimated BTU Loss</span>
                        <span>
                          Estimated kg of CO2e
                          <Tooltip
                            placement="leftTop"
                            title="CO2e is a standardized unit of measurement that combines the warming impact of all greenhouse gases, including: Carbon Dioxide (CO2), Methane (CH4), Nitrous Oxide (N2O) and Fluorinated gases (like HFCs, PFCs, and SF6). Each of these gases has a different Global Warming Potential (GWP), which is a measure of how much heat it traps in the atmosphere compared to a similar amount of CO2 over a specific period (usually 100 years). Using CO2e converts the emissions of these more potent gases into an equivalent amount of CO2. This allows for a single, uniform metric to compare the total climate impact from various sources. CO2e is used for calculating and reporting a total carbon footprint for a company, a product, or a country."
                          >
                            <InfoCircleOutlined style={{ marginLeft: 4, color: '#000ABC' }} />
                          </Tooltip>
                        </span>
                      </div>
                      {facilityStaticKeys?.map((key) => (
                        <PerformanceRow
                          key={key}
                          label={labels[key]}
                          values={facilitySummary?.[key]}
                        />
                      ))}
                      {facilityYearKeys
                        ?.sort((a, b) => Number(b) - Number(a))
                        ?.map((year) => (
                          <PerformanceRow
                            key={year}
                            label={year}
                            values={facilitySummary?.[year]}
                          />
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Dashboard;
