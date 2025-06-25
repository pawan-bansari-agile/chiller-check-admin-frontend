import React from 'react';

import HeaderToolbar from '@/shared/components/common/HeaderToolbar';
import Meta from '@/shared/components/common/Meta';
import { ROUTES } from '@/shared/constants/routes';

import NotificationCard from '../component/NotificationCard';
import { Wrapper } from '../style';

const Notification: React.FC = () => {
  return (
    <Wrapper>
      <Meta title="Notification" />
      <HeaderToolbar title="Notification" backBtn={true} backTo={ROUTES.DASHBOARD} />
      <ul>
        <NotificationCard
          notificationTitle="New Request"
          notificationDate="05/23/24 - 14:25"
          notificationDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus justo nec arcu aliquet ultrices. Suspendisse a rhoncus tellus. Sed tristique, ex ut ultricies vehicula, tortor augue molestie lacus, ac mattis mauris turpis vel libero."
        />
        <NotificationCard
          notificationTitle="New Request"
          notificationDate="05/23/24 - 14:25"
          notificationDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus justo nec arcu aliquet ultrices. Suspendisse a rhoncus tellus. Sed tristique, ex ut ultricies vehicula, tortor augue molestie lacus, ac mattis mauris turpis vel libero."
        />
      </ul>
    </Wrapper>
  );
};

export default Notification;
