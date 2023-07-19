import {initializeApp} from 'firebase/app'

    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCo3VfRktNPd53etI0HTvx4twZlduwgQL4",
    authDomain: "olx-clone-2ceac.firebaseapp.com",
    projectId: "olx-clone-2ceac",
    storageBucket: "olx-clone-2ceac.appspot.com",
    messagingSenderId: "431325978931",
    appId: "1:431325978931:web:d60872deb55bcf787b1e46",
    measurementId: "G-HXVPZS2KL7"
  };

  const firebase = initializeApp(firebaseConfig)
  export default firebase