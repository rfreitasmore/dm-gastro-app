import { firebase } from '../firebaseConfig';
import { getFirestore, collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore/lite';

const db = getFirestore(firebase);
const restaurantsCollection = collection(db, 'restaurants');

const fetchRestaurants = async () => {
  try {
    const restaurantSnapshot = await getDocs(restaurantsCollection);
    const restaurantList = restaurantSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return restaurantList;
  } catch (e) {
    console.error("Error fetching restaurants: ", e);
  }
};

const addRestaurant = async (restaurant) => {
  try {
    const docRef = await addDoc(restaurantsCollection, restaurant);
    console.log("Restaurant added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding restaurant: ", e);
  }
};

const updateRestaurant = async (id, updateData) => {
  try {
    const restaurantDoc = doc(db, 'restaurants', id);
    await updateDoc(restaurantDoc, updateData);
    console.log('Restaurant updated successfully!');
  } catch (e) {
    console.error('Error updating restaurant:', e.message || e);
    throw new Error('Update failed');
  }
};

const deleteRestaurant = async (id) => {
  try {
    const restaurantDoc = doc(db, 'restaurants', id);
    await deleteDoc(restaurantDoc);
    console.log('Restaurant deleted successfully!');
  } catch (e) {
    console.error('Error deleting restaurant:', e.message || e);
    throw new Error('Delete failed');
  }
};

const fetchRestaurantById = async (id) => {
  try {
    const restaurantDoc = doc(db, 'restaurants', id);
    const restaurantSnapshot = await getDoc(restaurantDoc);
    if (restaurantSnapshot.exists()) {
      return { id: restaurantSnapshot.id, ...restaurantSnapshot.data() };
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    console.error('Error fetching restaurant by ID: ', e);
  }
};

export {
  fetchRestaurants,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  fetchRestaurantById,
};
