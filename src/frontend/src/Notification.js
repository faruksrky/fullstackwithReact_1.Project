import {notification } from 'antd';
import React from 'react';


const openNotificationWithIcon = (type, message, description, placement) => {
    placement = placement || "topRight"
    notification[type]({message, description});
}

export const successNotification = (message, description, placement) =>
    openNotificationWithIcon('success', message, description, placement);

export const errorNotification = (message, description, placement) =>
    openNotificationWithIcon('error', message, description, placement);

export const warningNotification = (message, description, placement) =>
    openNotificationWithIcon('warning', message, description, placement);