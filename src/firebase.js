import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhVOvk07dZozmsaV9fTACudTSt04fZn50",
  authDomain: "whatsapp-mern-ae0af.firebaseapp.com",
  projectId: "whatsapp-mern-ae0af",
  storageBucket: "whatsapp-mern-ae0af.appspot.com",
  messagingSenderId: "1043066491865",
  appId: "1:1043066491865:web:220c95367ef5778afa7fc8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
