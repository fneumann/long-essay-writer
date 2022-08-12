import { defineStore } from 'pinia';
import localForage from "localforage";

const storage = localForage.createInstance({
    storeName: "writer-alerts",
    description: "Alert Messages",
});

/**
 * Resources Store
 */
export const useAlertStore = defineStore('alerts',{
    state: () => {
        return {
            // saved in storage
            keys: [],               // list of string keys
            alerts: [],             // list of alert objects
            activeKey: ''           // key of the active alert
        }
    },


    getters: {
        hasAlerts: (state) => state.alerts.length > 0,

        activeMessage(state) {
          const alert = state.alerts.find(element => element.key == state.activeKey);

          return alert ? alert.message : ""
        },

        getAlert(state) {
            return (key) => state.alerts.find(element => element.key == key)
        },

        isActive(state) {
            return (alert) => state.activeKey == alert.key
        }
    },

    actions: {

         async clearStorage() {
            try {
                await storage.clear();
            }
            catch (err) {
                console.log(err);
            }
        },

        async loadFromStorage() {
            try {
                const keys = await storage.getItem('alertKeys');
                if (keys) {
                    this.keys =  JSON.parse(keys);
                }
                this.activeKey = await storage.getItem('activeKey') ?? '';
                this.alerts = [];

                let index = 0;
                while (index < this.alerts.length) {
                    let alert = await storage.getItem(this.keys[index]);
                    this.alerts.push(alert);
                    index++;
                }

            } catch (err) {
                console.log(err);
            }
        },

        async loadFromData(data) {

            try {
                await storage.clear();

                let keys = [];
                let alerts = [];

                let index = 0;
                while (index < data.length) {
                    let alert = data[index];
                    if (typeof(this.getAlert(alert.key)) == 'undefined') {
                        this.activeKey = alert.key;
                    }
                    alerts.push(alert);
                    keys.push(alert.key);
                    await storage.setItem(alert.key, alert);
                    index++;
                }

                this.keys = keys;
                this.alerts = alerts;

                await storage.setItem('alertKeys', JSON.stringify(this.keys));
                await storage.setItem('activeKey', this.activeKey);
            }
            catch (err) {
                console.log(err);
            }
        },
    }
});