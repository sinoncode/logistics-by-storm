importScripts(
  "https://www.gstatic.com/firebasejs/12.14.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.14.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAOxjGjWgS4_Logb3p5VH1sV4FsjLgKtCE",
  authDomain: "logisticsystem-7389c.firebaseapp.com",
  projectId: "logisticsystem-7389c",
  messagingSenderId: "374504476829",
  appId: "1:374504476829:web:9b7b9eadc6dfe457b7c474",
});

const messaging =
  firebase.messaging();

messaging.onBackgroundMessage(
  (payload) => {
    self.registration.showNotification(
      payload.notification.title,
      {
        body:
          payload.notification.body,
      }
    );
  }
);