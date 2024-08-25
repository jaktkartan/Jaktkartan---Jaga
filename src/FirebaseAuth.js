const loginDiv = document.getElementById('login');

auth.onAuthStateChanged(user => {
    if (user) {
        loginDiv.innerHTML = `<p>Welcome, ${user.email}</p>`;
        // Load map and chat features
    } else {
        loginDiv.innerHTML = `
            <button id="login-btn">Login with Google</button>
        `;
        document.getElementById('login-btn').addEventListener('click', () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider);
        });
    }
});
