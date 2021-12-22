import { createContext, useState, useEffect } from 'react';

const NotificationContext = createContext({
  notification: null,
  showNotification: function (notifData) {},
  hideNotification: function () {},
});

export const NotificationContextProvider = props => {
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === 'success' ||
        activeNotification.status === 'error')
    ) {
      const timer = setTimeout(() => {
        hideNotificationHandler();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const showNotificationHandler = notifData => {
    setActiveNotification(notifData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  return (
    <NotificationContext.Provider
      value={{
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
