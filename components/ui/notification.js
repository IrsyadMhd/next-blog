import classes from './notification.module.css';

const Notification = props => {
  const { status, title, text } = props;

  return (
    <div className={`center ${classes.notif} ${classes[status]}`}>
      <p>{title}</p>
      <p>{text}</p>
    </div>
  );
};

export default Notification;
