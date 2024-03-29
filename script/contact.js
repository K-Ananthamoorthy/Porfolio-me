// Import Firebase modules directly from URLs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB93iYhOjDOwecVaeAQ1jKEYlLlQrUAQVs",
    authDomain: "portfolio-000021.firebaseapp.com",
    databaseURL: "https://portfolio-000021-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "portfolio-000021",
    storageBucket: "portfolio-000021.appspot.com",
    messagingSenderId: "332368809853",
    appId: "1:332368809853:web:141e87ad6266a4bb3c0614",
    measurementId: "G-54KV2L7JZJ"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebaseApp);

// Get form elements
const form = document.querySelector('.form');
const fullNameInput = form.querySelector('input[name="fullname"]');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const formBtn = form.querySelector('.form-btn');

// Disable form submission initially
formBtn.disabled = true;

// Enable form submission when all inputs are filled
form.addEventListener('input', () => {
    const inputsFilled = fullNameInput.value && emailInput.value && messageInput.value;
    formBtn.disabled = !inputsFilled;
});

// Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value;

    // Create a new document in the "contacts" collection with email as the document ID and timestamp
    try {
        await setDoc(doc(db, "contacts", email), {
            fullName: fullNameInput.value,
            email: email,
            message: messageInput.value,
            timestamp: serverTimestamp() // Firestore server timestamp
        });

        // Reset form after successful submission
        form.reset();
        formBtn.disabled = true;

        // Optional: Show success message to user
        alert('Message sent successfully!');
    } catch (error) {
        console.error("Error adding document: ", error);
        // Optional: Show error message to user
        alert('An error occurred. Please try again later.');
    }
});
