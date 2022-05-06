import { defineStore } from 'pinia';
import localForage from "localforage";

const storage = localForage.createInstance({
    storeName: "resources",
    description: "Resource data",
});

/**
 * Resources Store
 */
export const useResourcesStore = defineStore('resources',{
    state: () => {
        return {
            // saved in storage
            keys: [],               // list of string keys
            resources: [],          // list of resource objects
            activeKey: ''           // key of the active resource
        }
    },


    getters: {
        hasResources: (state) => state.resources.length > 0,

        activeTitle(state) {
          const resource = state.resources.find(element => element.key == state.active_key);

          return resource ? resource.title : ""
        },

        getResource(state) {
            return (key) => state.resources.find(element => element.key == key)
        },

        isActive(state) {
            return (resource) => state.active_key == resource.key
        }
    },

    actions: {
        async loadFromStorage() {
            try {
                this.keys =  await storage.getItem('resourceKeys') ?? [];
                this.activeKey = await storage.getItem('activeKey') ?? [];
                this.resources = [];

                let index = 0;
                while (index < this.keys.length) {
                    let resource = await storage.getItem(this.keys[index]);
                    this.resources.push(resource);
                }

            } catch (err) {
                console.log(err);
            }
        },

        async loadFromData(data) {

            try {
                await storage.clear();

                this.keys = [];
                this.resources = [];

                let index = 0;
                while (index < data.length) {
                    let resource = data[index];
                    this.resources.push(resource);
                    this.keys.push(resource.key);
                    await storage.setItem(resource.key, resource);
                    index++;
                }

                await storage.setItem('resourceKeys', this.keys);
                await storage.setItem('activeKey', this.activeKey);
            }
            catch (err) {
                console.log(err);
            }
        },

        async selectResource(resource) {
            this.active_key = resource.key;
            await storage.setItem('activeKey', this.activeKey);
        }
    }
});