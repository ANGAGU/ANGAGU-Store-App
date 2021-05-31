import AsyncStorage from '@react-native-async-storage/async-storage';
export default async () => {
    let result = await AsyncStorage.getItem("token");
    
    if (result == "" || result == null)
        return false;
    else
        return true;
}