import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  deleteDoc,
  setDoc,
  getDoc
} from 'firebase/firestore'
import { db } from './index.js'

// AUTH

export const login = (auth, email, password) => signInWithEmailAndPassword(auth, email, password)
export const register = (auth, email, password) => createUserWithEmailAndPassword(auth, email, password)
export const logout = (auth) => signOut(auth)

// POSTS

export const getPosts = async () => {
  const snapshot = await getDocs(collection(db, 'posts'))

  return snapshot.docs.map((post) => post.data()).sort((x, y) => y.timestamp - x.timestamp)
}

export const getUserPosts = async (email) => {
  const queryData = query(collection(db, 'posts'), where('email', '==', email))
  const snapshot = await getDocs(queryData)

  return snapshot.docs.map((post) => post.data()).sort((x, y) => y.timestamp - x.timestamp)
}

export const getPost = async (id) => {
  const docRef = doc(db, 'posts', id)
  const docSnap = await getDoc(docRef)

  return docSnap.data()
}

export const addPost = (newPost) => setDoc(doc(db, 'posts', newPost.id), newPost)
export const editPost = (updatedPost) => setDoc(doc(db, 'posts', updatedPost.id), updatedPost)
export const removePost = (id) => deleteDoc(doc(db, 'posts', id))

// COMMENTS

export const getComments = async (articleId) => {
  const queryData = query(collection(db, 'comments'), where('articleId', '==', articleId))
  const snapshot = await getDocs(queryData)

  return snapshot.docs.map((comment) => comment.data()).sort((x, y) => x.timestamp - y.timestamp)
}

export const addComment = (newComment) => setDoc(doc(db, 'comments', newComment.id), newComment)