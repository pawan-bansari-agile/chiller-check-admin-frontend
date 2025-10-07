import React, { useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import {
  CompressorRunHours,
  PerformanceSummary,
  PurgeData,
  RecentReadingAnalysis
} from '@/services/chiller/types';

import CommonModal from '@/shared/components/common/Modal/components/CommonModal';
import { TimezoneEnum } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/routes';

dayjs.extend(utc);
dayjs.extend(timezone);

interface IProps {
  recentReadings: RecentReadingAnalysis;
  performanceSummary: PerformanceSummary;
  purgeData: PurgeData;
  compressorRunHours: CompressorRunHours;
  facilityTimezone?: string;
}

const AnalyticsTab: React.FC<IProps> = ({
  recentReadings,
  performanceSummary,
  purgeData,
  compressorRunHours,
  facilityTimezone = TimezoneEnum.EST
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [problemData, setProblemData] = useState<{
    problem: string;
    solution: string;
    field: string;
  } | null>(null);

  const formatRunHr = (value: number | null | undefined) =>
    value != null || value != undefined ? `${value?.toFixed(2)} %` : '-';

  const formatDollar = (value: number | null | undefined) =>
    value != null || value != undefined
      ? `$ ${value?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : '-';

  const selectedZone = useMemo(() => {
    return TimezoneEnum[facilityTimezone as keyof typeof TimezoneEnum] || TimezoneEnum.EST;
  }, [facilityTimezone]);

  const readingDate = useMemo(() => {
    if (!recentReadings?.readingDateUTC) return null;
    return dayjs.utc(recentReadings.readingDateUTC).tz(selectedZone).format('MM/DD/YY');
  }, [recentReadings?.readingDateUTC, selectedZone]);

  const readingTime = useMemo(() => {
    if (!recentReadings?.readingDateUTC) return null;
    return dayjs.utc(recentReadings.readingDateUTC).tz(selectedZone).format('hh:mm A');
  }, [recentReadings?.readingDateUTC, selectedZone]);

  return (
    <>
      <div className="analyticsGraph">
        <div className="mainGraphWrap">
          <div className="charityCard">
            <div className="issueHeader">
              <h2 className="themeColor">Recent Reading Analysis</h2>
            </div>
            <div className="scrollDiv">
              <div className="consumptionChart">
                <div className="labelWrap">
                  <span>Date & Time</span>
                  <span>Problem</span>
                  <span>Eff Loss</span>
                  <span>Projected Ann. Cost of Loss</span>
                  <span>Eff. Loss at Average Load Profile</span>
                  <span>Eff. Loss at Full Load</span>
                </div>
                {recentReadings && Object.keys(recentReadings)?.length ? (
                  <div className="valueWrap">
                    <div className="timeValueWrap">
                      <span
                        className="recentTimeWrap"
                        onClick={() =>
                          recentReadings?.logId &&
                          navigate(ROUTES.VIEW_LOG_ENTRY(recentReadings?.logId))
                        }
                      >
                        <span>{readingDate || '-'}</span>
                        <span>{readingTime || '-'}</span>
                      </span>
                    </div>
                    <div>
                      {recentReadings?.problem?.length
                        ? recentReadings?.problem?.map((problem) => {
                            return (
                              <span
                                className="problemLink"
                                onClick={() => {
                                  setProblemData({
                                    problem: problem?.problem,
                                    solution: problem?.solution,
                                    field: problem?.field
                                  });
                                  setIsModalOpen(true);
                                }}
                              >
                                {problem?.field}
                              </span>
                            );
                          })
                        : '-'}
                    </div>
                    <div>
                      {recentReadings?.problem?.length
                        ? recentReadings?.problem?.map((problem) => {
                            return (
                              <span className="prob_eff_loss">
                                {formatRunHr(problem?.prob_eff_loss)}
                              </span>
                            );
                          })
                        : '-'}
                    </div>
                    <div>
                      {recentReadings?.problem?.length
                        ? recentReadings?.problem?.map((problem) => {
                            return (
                              <span className="proj_cost_of_loss">
                                {formatDollar(problem?.proj_cost_of_loss)}
                              </span>
                            );
                          })
                        : '-'}
                    </div>
                    {/* <div>{formatRunHr(recentReadings?.effLoss?.value)}</div>
                  <div>{formatDollar(recentReadings?.projectedAnnualCostOfLoss)}</div> */}
                    <div>{formatRunHr(recentReadings?.effLossAtAverageLoadProfile?.value)}</div>
                    <div>{formatRunHr(recentReadings?.effLossAtFullLoad)}</div>
                  </div>
                ) : (
                  <div className="no-data">No Data Found</div>
                )}
              </div>
            </div>
          </div>

          <div className="charityCard">
            <div className="issueHeader">
              <h2 className="themeColor">Performance Summary</h2>
            </div>
            <div className="scrollDiv">
              <div className="consumptionChart performanceSummaryChart">
                <div className="labelWrap">
                  <span></span>
                  <span>Avg. Eff. Loss</span>
                  <span>Total Target Cost at Average Load Profile </span>
                  <span>Total Actual Cost at Average Load Profile </span>
                  <span>Avg. Loss</span>
                </div>
                <div className="valueWrap">
                  <div>This YTD</div>
                  <div>{formatRunHr(performanceSummary?.['1']?.perfSummary?.avgLoss)}</div>
                  <div>{formatDollar(performanceSummary?.['1']?.perfSummary?.targetCost)}</div>
                  <div>{formatDollar(performanceSummary?.['1']?.perfSummary?.actualCost)}</div>
                  <div>{formatDollar(performanceSummary?.['1']?.perfSummary?.lossCost)}</div>
                </div>
                <div className="valueWrap">
                  <div>Last YTD</div>
                  <div>{formatRunHr(performanceSummary?.['2']?.perfSummary?.avgLoss)}</div>
                  <div>{formatDollar(performanceSummary?.['2']?.perfSummary?.targetCost)}</div>
                  <div>{formatDollar(performanceSummary?.['2']?.perfSummary?.actualCost)}</div>
                  <div>{formatDollar(performanceSummary?.['2']?.perfSummary?.lossCost)}</div>
                </div>
                <div className="valueWrap">
                  <div>Last 12 Months</div>
                  <div>{formatRunHr(performanceSummary?.['3']?.perfSummary?.avgLoss)}</div>
                  <div>{formatDollar(performanceSummary?.['3']?.perfSummary?.targetCost)}</div>
                  <div>{formatDollar(performanceSummary?.['3']?.perfSummary?.actualCost)}</div>
                  <div>{formatDollar(performanceSummary?.['3']?.perfSummary?.lossCost)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="charityCard compressorPurgeCard">
            <div className={`compresssorHeader ${!purgeData?.havePurge ? 'w-100-imp' : ''}`}>
              <div className="issueHeader">
                <h2 className="themeColor">Compressor Run Hours</h2>
              </div>
              <div className="scrollDiv">
                <div className="consumptionChart">
                  <div className="labelWrap">
                    <span title="Run Hr. YTD">Run Hr. YTD</span>
                    <span title="Run Hr. Last YTD">Run Hr. Last YTD</span>
                    <span title="Run Hr. Last 12 Months">Run Hr. Last 12 Months</span>
                    <span title="Est. Annual Run Hr.">Est. Annual Run Hr.</span>
                  </div>
                  <div className="valueWrap">
                    <div>{compressorRunHours?.runHrYTD?.toFixed(2) ?? '-'}</div>
                    <div>{compressorRunHours?.runHrLastYTD?.toFixed(2) ?? '-'}</div>
                    <div>{compressorRunHours?.runHrLast12Months?.toFixed(2) ?? '-'}</div>
                    <div>{compressorRunHours?.estAnnualRunHr?.toFixed(2) ?? '-'}</div>
                  </div>
                </div>
              </div>
            </div>

            {purgeData?.havePurge && (
              <div className="purgeHeader">
                <div className="issueHeader">
                  <h2 className="themeColor">Purge Total Pumpout Time</h2>
                </div>
                <div className="scrollDiv">
                  <div className="consumptionChart">
                    <div className="labelWrap">
                      <span title="Most Recent 7-Day Avg.">Most Recent 7-Day Avg.</span>
                      <span title="Most Recent 30-Day Avg.">Most Recent 30-Day Avg.</span>
                    </div>
                    <div className="valueWrap">
                      <div>{purgeData?.display7DayAvg || '-'}</div>
                      <div>{purgeData?.display30DayAvg || '-'}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CommonModal
          open={isModalOpen}
          closeIcon={true}
          closable={true}
          centered={true}
          width={800}
          className="problemSolutionModal"
          title={
            <div className="modalTitleWrapper">
              <ExclamationCircleOutlined style={{ color: '#FEBE00', fontSize: '22px' }} />
              <h2>{problemData?.field || '-'}</h2>
            </div>
          }
          onCancel={() => {
            setIsModalOpen(false);
            setProblemData(null);
          }}
        >
          <div className="problemSolutionModalContent">
            <h3>Problem:</h3>
            <p>Here are the things you can check</p>
            <p
              dangerouslySetInnerHTML={{
                __html: problemData?.problem || ''
              }}
            />
            <h3>Solution:</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: problemData?.solution || ''
              }}
            />
          </div>
        </CommonModal>
      )}
    </>
  );
};

export default AnalyticsTab;
