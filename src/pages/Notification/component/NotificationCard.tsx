import React from 'react';

interface INotification {
  notificationTitle: string;
  notificationDate: string;
  notificationDescription: string;
}
const NotificationCard: React.FC<INotification> = ({
  notificationTitle,
  notificationDate,
  notificationDescription
}) => {
  return (
    <li className="notificationLists">
      <div className="notificationListHeader">
        <h2>{notificationTitle}</h2>
        <h3>{notificationDate}</h3>
      </div>
      <p>{notificationDescription}</p>
    </li>
  );
};

export default NotificationCard;
