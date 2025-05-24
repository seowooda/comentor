importScripts(
  'https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js',
)
importScripts(
  'https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js',
)

firebase.initializeApp({
  apiKey: 'AIzaSyDFogTQX_h9I7sDwLBflzWGWst3Jl-kiuE',
  authDomain: 'comentor-b661e.firebaseapp.com',
  projectId: 'comentor-b661e',
  storageBucket: 'comentor-b661e.firebasestorage.app',
  messagingSenderId: '568911920834',
  appId: '1:568911920834:web:9089c72816710a5374c55b',
  measurementId: 'G-WJP86BT6CY',
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  // console.log('[firebase-messaging-sw.js] 백그라운드 메시지 수신:', payload)

  const { title, body } = payload.notification

  self.registration.showNotification(title, {
    body,
    icon: '/icons/icon-192x192.png',
  })
})
