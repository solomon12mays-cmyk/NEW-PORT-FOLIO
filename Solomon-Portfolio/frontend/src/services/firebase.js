import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

// የእርስዎ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCcdN2g2KqZ2Nx2VNQ1yQ1D5K5Q5K5Q5K5",
  authDomain: "solomon-portfolio-946a6.firebaseapp.com",
  projectId: "solomon-portfolio-946a6",
  storageBucket: "solomon-portfolio-946a6.appspot.com",
  messagingSenderId: "829013597466",
  appId: "1:829013597466:web:558d334356f4892e1ce0a3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const sendMessage = async (name, text) => {
  await addDoc(collection(db, 'messages'), {
    name,
    text,
    timestamp: new Date(),
  });
};

export const listenMessages = (callback) => {
  const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(messages);
  });
};