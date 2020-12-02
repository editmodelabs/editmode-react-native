import AsyncStorage from '@react-native-community/async-storage';
import { Platform } from 'react-native';

export const getCachedData = Platform.OS === 'web'
  ? (id) => localStorage.getItem(id)
  : async (id) => {
    try {
      return await AsyncStorage.getItem(id);
    } catch (error) {
      console.error('Error in fetching chunk.', error);
    }
  };

export const storeCache = Platform.OS === 'web'
  ? (id, data) =>  localStorage.setItem(id, JSON.stringify(data))
  : async (id, data) => {
    try {
      await AsyncStorage.setItem(
        id,
        JSON.stringify(data)
      );
    } catch (error) {
      console.error('Error in saving chunk.', error);
    }
  };
