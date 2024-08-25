// Importera och konfigurera Firebase
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    databaseURL: process.env.DATABASE_URL
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// Hantera autentisering och hämta token
auth.onAuthStateChanged(user => {
    const loginDiv = document.getElementById('login');

    if (user) {
        loginDiv.innerHTML = `<p>Welcome, ${user.email}</p>`;
        user.getIdToken().then(token => {
            // Använd tokenen för att göra API-anrop
            callAppsScriptAPI(token);
        });
    } else {
        loginDiv.innerHTML = `<button id="login-btn">Login with Google</button>`;
        document.getElementById('login-btn').addEventListener('click', () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider);
        });
    }
});

// Funktion för att göra API-anrop till Google Apps Script
function callAppsScriptAPI(token) {
    fetch("https://script.google.com/macros/s/your-script-id/exec", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            data: "Din data här"
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("API response:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

export { auth };
