const chatDiv = document.getElementById('chat');

auth.onAuthStateChanged(user => {
    if (user) {
        chatDiv.innerHTML = `
            <input type="text" id="messageInput" placeholder="Enter message" />
            <button id="sendMessageBtn">Send</button>
            <div id="messages"></div>
        `;

        const messagesDiv = document.getElementById('messages');

        db.collection('messages').orderBy('timestamp')
            .onSnapshot(snapshot => {
                messagesDiv.innerHTML = '';
                snapshot.docs.forEach(doc => {
                    const message = doc.data();
                    messagesDiv.innerHTML += `<p>${message.user}: ${message.text}</p>`;
                });
            });

        document.getElementById('sendMessageBtn').addEventListener('click', () => {
            const messageInput = document.getElementById('messageInput').value;
            db.collection('messages').add({
                user: user.email,
                text: messageInput,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        });
    }
});
