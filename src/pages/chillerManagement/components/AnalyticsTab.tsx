import React from 'react';

import { Link } from 'react-router-dom';

import { FallOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Line } from 'react-chartjs-2';

import Details from '@/shared/components/common/Details';
import { ROUTES } from '@/shared/constants/routes';
import { toAbsoluteUrl } from '@/shared/utils/functions';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
  Legend,
  annotationPlugin
);

interface IProps {
  maker: string;
  year: string;
  module: string;
  cost: string;
  facilityName: string;
  serialNumber: string;
  chillerName?: string;
}

const AnalyticsTab: React.FC<IProps> = ({
  maker,
  year,
  module,
  cost,
  facilityName,
  serialNumber,
  chillerName
}) => {
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        data: [5000, 6000, 11000, 5000, 7000, 23000, 4500],
        borderColor: '#0000cc',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#0000cc',
        pointBorderColor: '#0000cc',
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => `$${context.formattedValue}`
        },
        backgroundColor: '#fff',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#ccc',
        borderWidth: 1,
        titleFont: { weight: 'bold' }
      },
      legend: {
        display: false
      },
      annotation: {
        annotations: {
          verticalLine: {
            type: 'line',
            scaleID: 'x',
            value: 'Thursday',
            borderColor: '#00cc99',
            borderWidth: 3
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `${value}`
        }
      }
    }
  };

  return (
    <>
      <div className="chillerAnalyticsDetailsWrap">
        <h3>{chillerName || '-'}</h3>
        <ul className="chillerAnalyticsDetails">
          <Details
            detailsIcon
            detailsTitle={module && year ? `${module}(${year})` : '-'}
            detailsDescription="Making Year and Module"
          />
          <Details
            detailsIcon
            detailsTitle={cost ? `$${cost} KW/hr` : '-'}
            detailsDescription="Cost"
          />
          <Details detailsIcon detailsTitle={maker || '-'} detailsDescription="Maker" />
          <Details detailsIcon detailsTitle={facilityName || '-'} detailsDescription="Facility" />
          <Details
            detailsIcon
            detailsTitle={serialNumber || '-'}
            detailsDescription="Serial Number"
          />
        </ul>
      </div>
      <div className="analyticsGraph">
        <ul className="timeLegends">
          <li className="active">Week</li>
          <li>Month</li>
          <li>Year</li>
        </ul>

        <div className="mainGraphWrap">
          <Row gutter={[20, 20]}>
            <Col xs={24} sm={24} md={24} lg={8}>
              <div className="charityCard">
                <h2 className="themeColor">Average Energy Loss</h2>
                <div className="gaugeChart">
                  <img src={toAbsoluteUrl('/icons/gaugeSVG.svg')} alt="guage" />
                </div>
                <div className="gaugeDate">
                  <h4>50KW</h4>
                  <div className="avgPercentage">
                    <FallOutlined style={{ color: '#F04924' }} />
                    <span>4.8%</span>
                    <span>{'<'}</span>
                    <span>last Month</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8}>
              <div className="charityCard">
                <h2 className="themeColor">Efficient Rating</h2>
                <div className="gaugeChart">
                  <img src={toAbsoluteUrl('/icons/effChart.svg')} alt="guage" />
                </div>
                <div className="gaugeDate">
                  <h4>0.5KW/Ton</h4>
                  <div className="avgPercentage">
                    <span>700 Tons</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8}>
              <div className="charityCard">
                <h2 className="themeColor">Cost At Load</h2>
                <div className="gaugeChart">
                  <img src={toAbsoluteUrl('/icons/costLoad.svg')} alt="guage" />
                </div>
                <div className="gaugeDate">
                  <h4>52 Wats/Year</h4>
                  <div className="avgPercentage">
                    <FallOutlined style={{ color: '#F04924' }} />
                    <span>4.8%</span>
                    <span>{'<'}</span>
                    <span>last Week</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <div className="charityCard">
                <h2 className="themeColor">Average Energy Consumption</h2>
                <div className="consumptionChart">
                  <Line data={data} options={options as any} height={70} />
                </div>
              </div>
            </Col>
            <Col span={24}>
              <div className="charityCard">
                <div className="issueHeader">
                  <h2 className="themeColor">Issue Reported - Condenser</h2>
                  <Link to={ROUTES.REPORT}>View All</Link>
                </div>
                <div className="scrollDiv">
                  <div className="consumptionChart">
                    <div className="labelWrap">
                      <span>Date & Time</span>
                      <span>Inlet Temp</span>
                      <span>Outlet Temp</span>
                      <span>Refrig Temp</span>
                      <span>Excess Approach</span>
                      <span>Pressure</span>
                      <span>Non Cond</span>
                      <span>Pressure Drop</span>
                    </div>
                    <div className="valueWrap">
                      <div className="timeValueWrap">
                        <span>8-4-2024 5:30 PM</span>{' '}
                        <span>
                          <span className="loss">Loss: 12%</span> <span>Load: 10%</span>
                        </span>
                      </div>
                      <div>86.0</div>
                      <div>96.0</div>
                      <div>95.4</div>
                      <div>0.0</div>
                      <div>183.0</div>
                      <div className="legends">
                        <span>7.8</span>
                      </div>
                      <div>N/A</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default AnalyticsTab;
