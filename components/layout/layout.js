import { Fragment, useContext } from 'react';

import MainHeader from './main-header';
import Notification from '../ui/notification';
import NotificationContext from '../../store/notification-context';

function Layout(props) {
  const notifCtx = useContext(NotificationContext);

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {notifCtx.notification && (
        <Notification
          status={notifCtx.notification.status}
          title={notifCtx.notification.title}
          text={notifCtx.notification.text}
        />
      )}
    </Fragment>
  );
}

export default Layout;
