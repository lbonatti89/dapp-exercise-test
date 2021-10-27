import React from 'react';
import { useNotifications } from '@usedapp/core';
import { Alert, Snackbar } from '@mui/material';
import { NOTIFICATIONS } from '../../constants/commons';

const Notifier = () => {
  const { notifications = [] } = useNotifications();

  return notifications.map(
    (notification) =>
      NOTIFICATIONS[notification.type] && (
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} key={notification.id} open={true}>
          <Alert severity={NOTIFICATIONS[notification.type].type} sx={{ width: '100%' }}>
            {NOTIFICATIONS[notification.type].getLabel()}
          </Alert>
        </Snackbar>
      ),
  );
};

export default Notifier;
