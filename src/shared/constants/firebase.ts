import {
  APP_ENV,
  ENVIRONMENT,
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_SENDER_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_VAPID_KEY,
  LocalStorageKeys
} from '.';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

interface FetchTokenOptions {
  setFcmToken?: (token: string) => void; // For state management
  setIsLoadingToken?: (loading: boolean) => void; // For loading UI
}

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_SENDER_ID,
  appId: FIREBASE_APP_ID
};

const ENABLE_FIREBASE = APP_ENV !== ENVIRONMENT['LOCAL'];

let app: ReturnType<typeof initializeApp> | null = null;
let messaging: ReturnType<typeof getMessaging> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;

if (ENABLE_FIREBASE) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  messaging = getMessaging(app);
}

export { auth, messaging };
// Fetch and store the FCM Token
export const fetchToken = async (options: FetchTokenOptions = {}): Promise<void> => {
  const { setFcmToken, setIsLoadingToken } = options;
  if (!ENABLE_FIREBASE || !messaging) {
    setFcmToken?.('');
    return;
  }
  setIsLoadingToken?.(true);

  try {
    // Check if user has blocked notifications
    if (Notification.permission === 'denied') {
      setFcmToken?.('');
      return;
    }

    const token = await getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY });

    if (token) {
      setFcmToken?.(token);
      localStorage.setItem(LocalStorageKeys.FCM_TOKEN, token);
    } else {
      setFcmToken?.('');
    }
  } catch (error) {
    if ((error as Error)?.message?.includes('permission') || Notification.permission === 'denied') {
      // Expected case: user blocked notifications → just warn
      console.warn('Notification permission denied.');
    } else {
      // Unexpected case → log it for debugging
      console.error('Error retrieving FCM token:', error);
    }
    setFcmToken?.('');
  } finally {
    setIsLoadingToken?.(false);
  }
};

export const onMessageListener = async (api: any) => {
  if (!ENABLE_FIREBASE || !messaging) {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    onMessage(messaging!, (payload: any) => {
      api.info({
        message: payload?.data?.title,
        description: payload?.data?.body,
        duration: 5
      });
      resolve(payload);
    });
  });
};
