import { useEffect, useState } from 'react';
import {GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../config/firebase';
import {useAuth} from '../../hooks/useAuth';

export const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const {auth: authObject, setAuth} =  useAuth()
  const [loading, setLoading] = useState(true);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const { user: firebaseUser } = await signInWithPopup(auth, provider);
      setUser(firebaseUser);
      setAuth({
        user: {
          id: firebaseUser!.uid,
          name: firebaseUser!.displayName,
          email: firebaseUser!.email,
        },
      });
      return authObject;
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      setUser(firebaseUser);
    } catch (error) {
      console.error('Error signing up with email:', error);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      setUser(firebaseUser);
      return true;
    } catch (error) {
      console.error('Error signing in with email:', error);
      return false
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setAuth(undefined);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    signOut,
  };
};