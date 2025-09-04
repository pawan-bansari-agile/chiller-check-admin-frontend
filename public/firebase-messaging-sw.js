importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyBtws-XSV88c0UP-BYoKFdGK2mw01MxS1Q',
  authDomain: 'chillercheck2-firebase-project.firebaseapp.com',
  projectId: 'chillercheck2-firebase-project',
  storageBucket: 'chillercheck2-firebase-project.firebasestorage.app',
  messagingSenderId: '105958073778',
  appId: '1:105958073778:web:eaa98d72fa80c49ff7b0ab'
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

if (messaging) {
  messaging.onBackgroundMessage(function (payload) {
    const notificationData = JSON.parse(payload?.data?.data || '{}');

    const urlMap = {
      companyId: (id) => `/company-management/view/${id}`,
      facilityId: (id) => `/facility-management/view/${id}`,
      chillerId: (id) => `/chiller-management/view/${id}`,
      userId: (id) => `/user-management/view/${id}`,
      reportId: (id) => `/report/view/${id}`
    };

    let subUrl = '';

    // Go through each possible key one by one
    for (const key of Object.keys(urlMap)) {
      const idValue = notificationData[key]; // Check if notificationData has this ID
      if (idValue) {
        subUrl = urlMap[key](idValue); // Build the URL using the ID
        break; // Stop after finding the first match
      }
    }

    const notificationTitle = payload?.data?.title || 'New Notification';
    const notificationOptions = {
      body: payload.data.body,
      icon: './icons/icon-192x192.png',
      badge: './icons/icon-192x192.png',
      data: {
        url: self.location.origin + subUrl
      }
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}
// ✅ Click handler
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const url = event.notification.data?.url;

  if (url) {
    event.waitUntil(self.clients.openWindow(url));
  }
});
