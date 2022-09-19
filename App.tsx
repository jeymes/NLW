import { Background } from './src/components/Background';
import { StatusBar } from 'react-native';
import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';
import * as Notifications from 'expo-notifications';

import { 
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
 } from '@expo-google-fonts/inter'

import {Subscription} from 'expo-modules-core'

import { useRef, useEffect } from 'react';

import './src/services/notificationConfig';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';


export default function App() {

const getNotificatioListener = useRef<Subscription>();
const responseNotificatioListener = useRef<Subscription>();

useEffect(() => {
  getPushNotificationToken();
});

  const [fontsLoaded] = useFonts({
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
  });

  useEffect(() => {
    getNotificatioListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });
    responseNotificatioListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      if( getNotificatioListener.current && responseNotificatioListener.current ) {
        Notifications.removeNotificationSubscription(getNotificatioListener.current );
        Notifications.removeNotificationSubscription(responseNotificatioListener.current );
      }
    }
  }, []);
  // Token {"data": "ExponentPushToken[EzmNUnIEwtc7uYEe8ZI--i]", "type": "expo"}
  return (
    <Background>
    <StatusBar
    barStyle={"light-content"}
    backgroundColor='transparent'
    translucent
    />
    {
      fontsLoaded ? <Routes/> : <Loading/>
    }
    </Background>
  );
}
