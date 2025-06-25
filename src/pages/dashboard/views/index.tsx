import React from 'react';

import { DownOutlined, FallOutlined } from '@ant-design/icons';
import { Button, Col, Dropdown, Row } from 'antd';
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import ShadowPaper from '@/shared/components/common/ShadowPaper';
import { Alert, LogsIcon, WarningIcon } from '@/shared/svg';
import { toAbsoluteUrl } from '@/shared/utils/functions';

import CompanySelectorDropdown from '../component/CompanySelectorDropdown';
import { Wrapper } from '../style';

import 'react-circular-progressbar/dist/styles.css';

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  // const chartOptions = {
  //   plugins: { legend: { display: false }, tooltip: { enabled: false } },
  //   scales: { x: { display: false }, y: { display: false } },
  //   elements: { point: { borderWidth: 0 } }
  // };

  // Shared chart options
  const baseOptions = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    elements: { line: { tension: 0.4 } }
  };

  // Target Chart Data
  const targetData = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        data: [10, 10.5, 10, 9.5, 10],
        borderColor: '#00b894',
        borderWidth: 2,
        pointRadius: 0,
        fill: false
      }
    ]
  };

  // Actual Chart Data
  const actualData = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        data: [18, 20, 21, 19.5, 20],
        borderColor: '#d63031',
        borderWidth: 2,
        pointRadius: 0,
        fill: false
      }
    ]
  };

  // Estimated Loss Chart
  // const estimatedLossData = {
  //   labels: ['1', '2', '3', '4', '5', '6', '7'],
  //   datasets: [
  //     {
  //       data: [1, 1.5, 1.2, 2.5, 3, 2.2, 2.8],
  //       borderColor: '#d63031',
  //       backgroundColor: 'rgba(214, 48, 49, 0.1)',
  //       borderWidth: 2,
  //       pointRadius: 0,
  //       fill: true,
  //       tension: 0.4
  //     }
  //   ]
  // };

  // const estimatedLossOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: { display: false },
  //     tooltip: { enabled: false }
  //   },
  //   scales: {
  //     x: { display: false },
  //     y: { display: false }
  //   },
  //   elements: {
  //     line: { tension: 0.4 }
  //   }
  // };

  // KWH chart
  // const kwhData = [10, 12, 11, 14, 13, 15, 20];

  // const kwhLineData = {
  //   labels: kwhData.map((_, i) => i.toString()),
  //   datasets: [
  //     {
  //       data: kwhData,
  //       borderColor: '#00b894',
  //       backgroundColor: 'rgba(0, 184, 148, 0.1)',
  //       borderWidth: 2,
  //       fill: true,
  //       tension: 0.4,
  //       pointRadius: kwhData.map((_, i) => (i === kwhData.length - 1 ? 5 : 0)),
  //       pointBackgroundColor: '#00b894'
  //     }
  //   ]
  // };

  // BTU chart
  // const btuData = [15, 17, 16, 20, 22, 25, 30];

  // const btuLineData = {
  //   labels: btuData.map((_, i) => i.toString()),
  //   datasets: [
  //     {
  //       data: btuData,
  //       borderColor: '#d63031',
  //       backgroundColor: 'rgba(214, 48, 49, 0.1)',
  //       borderWidth: 2,
  //       fill: true,
  //       tension: 0.4,
  //       pointRadius: btuData.map((_, i) => (i === btuData.length - 1 ? 5 : 0)),
  //       pointBackgroundColor: '#d63031'
  //     }
  //   ]
  // };

  // facility dropdown
  const menu = (
    <div className="comapanyDashboardDropdown">
      <ul className="company-list">
        <li className={`company-item`}>Facility 1</li>
        <li className={`company-item`}>Facility 1</li>
        <li className={`company-item`}>Facility 1</li>
        <li className={`company-item`}>Facility 1</li>
        <li className={`company-item`}>Facility 1</li>
      </ul>
    </div>
  );

  return (
    <Wrapper>
      <Meta title="Dashboard" />
      <HeaderToolbar
        title="dashboard"
        button={
          <div className="dashboardHeader">
            <ul className="selectDuration">
              <li>
                <span className="active">Month</span>
              </li>
              <li>
                <span>Quarter</span>
              </li>
              <li>
                <span>Half Year</span>
              </li>
              <li>
                <span>Year</span>
              </li>
            </ul>

            {/* Dropdown */}
            <CompanySelectorDropdown />
          </div>
        }
      />
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={24} md={12} xl={6} lg={12}>
          <div className="dashboardCard">
            <h2>Cost at avg. Load Profile</h2>
            <div className="avgContentWrap">
              <div className="avgTarget avgList">
                <Line data={targetData} options={baseOptions} height={40} />
                <div className="avgContent">
                  <h5 className="avgTitle">$10k</h5>
                  <h6 className="avgDesc">Target</h6>
                  <div className="avgPercentage">
                    <FallOutlined style={{ color: '#F04924' }} />
                    <span>20%</span>
                  </div>
                </div>
              </div>
              <div className="avgActual avgList">
                <Line data={actualData} options={baseOptions} height={40} />
                <div className="avgContent">
                  <h5 className="avgTitle">$20k</h5>
                  <h6 className="avgDesc">Actual</h6>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} xl={6} lg={12}>
          <div className="dashboardCard">
            <h2>Avg. Efficiency Loss</h2>
            <div className="circularEff">
              <CircularProgressbarWithChildren
                value={70}
                counterClockwise={false}
                circleRatio={0.9}
                styles={{
                  path: {
                    stroke: '#00A86B'
                  },
                  root: {
                    transform: 'rotate(0.55turn)',
                    transformOrigin: 'center center'
                  }
                }}
              >
                <p className="pr-text">{80}%</p>
              </CircularProgressbarWithChildren>
            </div>
            <div className="circularContent">
              <h5 className="avgTitle">$32000 Loss</h5>
              <div className="avgPercentage">
                <FallOutlined style={{ color: '#F04924' }} />
                <span>4.8%</span>
                <span>{'<'}</span>
                <span>last Month</span>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} xl={6} lg={12}>
          <div className="dashboardCard">
            <h2>KWh Loss</h2>
            <div className="lossWrap">
              <div className="kwhLoss commonLoss">
                <img src={toAbsoluteUrl('/icons/kwhLoss.png')} alt="kwh" />
                {/* <Line data={kwhLineData} options={chartOptions} height={62} /> */}
                <div className="lossCountWrap">
                  <h3 className="lossCount">20</h3>
                  <h6 className="avgDesc">KWh Loss</h6>
                </div>
              </div>
              <h2>BTU Loss</h2>
              <div className="btuLoss commonLoss">
                {/* <Line data={btuLineData} options={chartOptions} height={62} /> */}
                <img src={toAbsoluteUrl('/icons/btuLoss.png')} alt="kwh" />
                <div className="lossCountWrap">
                  <h3 className="lossCount">20</h3>
                  <h6 className="avgDesc">BTU Loss</h6>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} xl={6} lg={12}>
          <div className="dashboardCard">
            <h2>Excess CO2</h2>
            <div className="gaugeChart">
              <img src={toAbsoluteUrl('/icons/gauge.png')} alt="guage" />
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

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="dashboardCard">
            <h2>Estimated Loss</h2>
            <div className="estimatedChart">
              {/* <Line data={estimatedLossData} options={estimatedLossOptions} height={74} /> */}
              <img src={toAbsoluteUrl('/icons/estimatedLoss.png')} alt="estimated" />
            </div>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="dashboardCard logCard">
            <ul className="logCount">
              <li>
                <div className="logCountWrap">
                  <Alert />
                  <span className="logCountTitle">Alerts</span>
                </div>
                <h2>200</h2>
              </li>
              <li>
                <div className="logCountWrap">
                  <WarningIcon />
                  <span className="logCountTitle">Warnings</span>
                </div>
                <h2>200</h2>
              </li>
              <li>
                <div className="logCountWrap">
                  <LogsIcon />
                  <span className="logCountTitle">Logs</span>
                </div>
                <h2>200</h2>
              </li>
            </ul>
          </div>
        </Col>
      </Row>

      <div className="facilityDashboard">
        <ShadowPaper>
          <div className="facilityDropdown">
            <Dropdown overlay={menu} trigger={['click']}>
              <Button type="primary" className="title-btn">
                Facility 1 <DownOutlined />
              </Button>
            </Dropdown>
          </div>
          <Row gutter={[10, 10]}>
            <Col xs={24} sm={24} md={12} xl={6} lg={12}>
              <div className="dashboardCard">
                <h2>Cost at avg. Load Profile</h2>
                <div className="avgContentWrap">
                  <div className="avgTarget avgList">
                    <Line data={targetData} options={baseOptions} height={40} />
                    <div className="avgContent">
                      <h5 className="avgTitle">$10k</h5>
                      <h6 className="avgDesc">Target</h6>
                      <div className="avgPercentage">
                        <FallOutlined style={{ color: '#F04924' }} />
                        <span>20%</span>
                      </div>
                    </div>
                  </div>
                  <div className="avgActual avgList">
                    <Line data={actualData} options={baseOptions} height={40} />
                    <div className="avgContent">
                      <h5 className="avgTitle">$20k</h5>
                      <h6 className="avgDesc">Actual</h6>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col xs={24} sm={24} md={12} xl={6} lg={12}>
              <div className="dashboardCard">
                <h2>Avg. Efficiency Loss</h2>
                <div className="circularEff">
                  <CircularProgressbarWithChildren
                    value={70}
                    counterClockwise={false}
                    circleRatio={0.9}
                    styles={{
                      path: {
                        stroke: '#00A86B'
                      },
                      root: {
                        transform: 'rotate(0.55turn)',
                        transformOrigin: 'center center'
                      }
                    }}
                  >
                    <p className="pr-text">{80}%</p>
                  </CircularProgressbarWithChildren>
                </div>
                <div className="circularContent">
                  <h5 className="avgTitle">$32000 Loss</h5>
                  <div className="avgPercentage">
                    <FallOutlined style={{ color: '#F04924' }} />
                    <span>4.8%</span>
                    <span>{'<'}</span>
                    <span>last Month</span>
                  </div>
                </div>
              </div>
            </Col>

            <Col xs={24} sm={24} md={12} xl={6} lg={12}>
              <div className="dashboardCard">
                <h2>KWh Loss</h2>
                <div className="lossWrap">
                  <div className="kwhLoss commonLoss">
                    <img src={toAbsoluteUrl('/icons/kwhLoss.png')} alt="kwh" />
                    {/* <Line data={kwhLineData} options={chartOptions} height={62} /> */}
                    <div className="lossCountWrap">
                      <h3 className="lossCount">20</h3>
                      <h6 className="avgDesc">KWh Loss</h6>
                    </div>
                  </div>
                  <h2>BTU Loss</h2>
                  <div className="btuLoss commonLoss">
                    {/* <Line data={btuLineData} options={chartOptions} height={62} /> */}
                    <img src={toAbsoluteUrl('/icons/btuLoss.png')} alt="kwh" />
                    <div className="lossCountWrap">
                      <h3 className="lossCount">20</h3>
                      <h6 className="avgDesc">BTU Loss</h6>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col xs={24} sm={24} md={12} xl={6} lg={12}>
              <div className="dashboardCard">
                <h2>Excess CO2</h2>
                <div className="gaugeChart">
                  <img src={toAbsoluteUrl('/icons/gauge.png')} alt="guage" />
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

            <Col xs={24} sm={24} md={12} lg={12}>
              <div className="dashboardCard">
                <h2>Estimated Loss</h2>
                <div className="estimatedChart">
                  {/* <Line data={estimatedLossData} options={estimatedLossOptions} height={74} /> */}
                  <img src={toAbsoluteUrl('/icons/estimatedLoss.png')} alt="estimated" />
                </div>
              </div>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12}>
              <div className="dashboardCard logCard">
                <ul className="logCount">
                  <li>
                    <div className="logCountWrap">
                      <Alert />
                      <span className="logCountTitle">Alerts</span>
                    </div>
                    <h2>200</h2>
                  </li>
                  <li>
                    <div className="logCountWrap">
                      <WarningIcon />
                      <span className="logCountTitle">Warnings</span>
                    </div>
                    <h2>200</h2>
                  </li>
                  <li>
                    <div className="logCountWrap">
                      <LogsIcon />
                      <span className="logCountTitle">Logs</span>
                    </div>
                    <h2>200</h2>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </ShadowPaper>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
