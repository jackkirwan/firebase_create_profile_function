// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//function that triggers on user creation
//this function will create a user profile in firestore database
exports.createProfile = functions.region('europe-west1').auth.user().onCreate(user => {
    // Do something after a new user account is created
    const doc = admin.firestore().doc(`/users/${user.uid}`)
    return doc.set({
        display_name: user.display_name,
        email: user.email,
        privacy_policy_version: 0,
        t_and_c_version: 0
    })
});
