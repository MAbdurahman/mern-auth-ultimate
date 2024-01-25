import { useContext } from "react";
import {AuthContext} from "../context/authContext";
import {NotificationContext} from '../context/notificationContext';

export const useAuth = () => useContext(AuthContext);