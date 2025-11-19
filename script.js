// script.js (または app.ts など)

// Firebaseの必要なモジュールをインポート
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

// ここにFirebase ConsoleからコピーしたfirebaseConfigを貼り付けます
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "starbuckscustomlab", // あなたのプロジェクトIDを確認
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebaseを初期化
const app = initializeApp(firebaseConfig);

// Cloud Firestoreのサービスを取得
const db = getFirestore(app);

// 例: データをFirestoreに書き込む関数
async function addProduct(name, price, tags) {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      name: name,
      price: price,
      tags: tags // タグは配列で保存
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// 例: Firestoreからデータを読み込む関数
async function getProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().name} (${doc.data().tags.join(', ')})`);
  });
}

// 使い方
// addProduct("Latte", 5.50, ["drink", "coffee", "hot"]);
// getProducts();

document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu-item a");
    const currentUrl = window.location.pathname.split("/").pop();

    menuItems.forEach(item => {
        if (item.getAttribute("href") === currentUrl) {
            item.classList.add("current");
        }
    });
});
