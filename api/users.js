import { firebase } from '../firebaseConfig';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore/lite';

const db = getFirestore(firebase);
const usersCollection = collection(db, 'users');

const addUser = async (user) => {
    try {
      const docRef = await addDoc(usersCollection, user);
      console.log("User added with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding user: ", e);
    }
};

const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(usersCollection);
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    } catch (e) {
      console.error("Error fetching users: ", e);
    }
};

const updateUser = async (id, updateData) => {
    try {
      const userDoc = doc(db, 'users', id);
      await updateDoc(userDoc, updateData);
      console.log("User successfully updated!");
    } catch (e) {
      console.error("Error updating user: ", e);
    }
};

const deleteUser = async (id) => {
    try {
      const userDoc = doc(db, 'users', id);
      await deleteDoc(userDoc);
      console.log("User successfully deleted!");
    } catch (e) {
      console.error("Error deleting user: ", e);
    }
};

export {
  addUser,
  fetchUsers,
  updateUser,
  deleteUser
};
