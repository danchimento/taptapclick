export default class SaveManager {
    constructor() {
        this.DATA_ID = '@CHIMENTO:LOCKED:LEVELS'
    }

    saveData = async (levels) => {
        try {
          await AsyncStorage.setItem(this.DATA_ID, JSON.stringify(levels));
        } catch (error) {
          // Error saving data
        }
    }
      
    getSaveData = async () => {
        try {
            const value = await AsyncStorage.getItem(this.DATA_ID);
            if (value !== null) {
                return JSON.parse(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    }
}