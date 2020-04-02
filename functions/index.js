// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//function that triggers on user creation
//this function will create a user profile in firestore database
exports.createProfile = functions.region('europe-west1').auth.user().onCreate(user => {
    // Do something after a new user account is created
    const doc = admin.firestore().doc(`/users/${user.uid}`);
    var providers = [];
    len = user.providerData.length;
    for (i = 0; i < len; i++) {
        if (user.providerData[i].providerId !== null) {
            providers[providers.length] = user.providerData[i].providerId;
        }
    }

    var creationTime = Date(user.metadata.creationTime);

    return doc.set({
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        location: null,
        dateOfBirth: null,
        gender: null,
        providers: providers,
        privacyPolicy: {
            version: 0,
        },
        termsAndConditions: {
            version: 0,
        },
        contactPreferences: {
            email: false
        },
        creationTime: creationTime
    })
});