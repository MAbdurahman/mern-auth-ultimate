import { useContext } from "react";
import {NotificationContext} from '../context/notificationContext';

export const useNotification = () => useContext(NotificationContext);