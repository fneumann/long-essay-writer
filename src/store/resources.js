import { defineStore } from 'pinia';
import localForage from "localforage";

const storage = localForage.createInstance({
    storeName: "resources",
    description: "Resource data",
});

/**
 * Task Store
 */
export const useResourcesStore = defineStore('resources',{
    state: () => {
        return {
            resources: [
                {
                    id: 1,
                    title: 'Grundgesetz',
                    type: 'pdf',
                    source: 'GG.pdf'
                },
                {
                    id: 2,
                    title: 'Gesetze im Internet',
                    type: 'url',
                    source: 'https://www.gesetze-im-internet.de',
                },
                {
                    id: 3,
                    title: 'EDUTIEK Home Page',
                    type: 'url',
                    source: 'https://www.edutiek.de'
                },
            ],
            active_id: 0
        }
    },


    getters: {
        hasResources: (state) => state.resources.length > 0,

        activeTitle(state) {
          const resource = state.resources.find(element => element.id == state.active_id);

          return resource ? resource.title : ""
        },

        getResource(state) {
            return (id) => state.resources.find(element => element.id == id)
        },

        isActive(state) {
            return (resource) => state.active_id == resource.id
        }
    },

    actions: {
        async loadFromStorage() {
            try {
                //this.resources = await storage.getItem('resources');
                this.active_id =  await storage.getItem('active_id');
            } catch (err) {
                console.log(err);
            }
        },

        async saveToStorage() {
            try {
                //await storage.setItem('resources', this.resources);
                await storage.setItem('active_id', this.active_id);
            } catch (err) {
                console.log(err);
            }
        },

        async loadFromData(data) {
            try {
                this.resources = data.resources;
                this.active_id = data.active_id;
                await this.saveToStorage();
            } catch (err) {
                console.log(err);
            }
        },

        selectResource(resource) {
            this.active_id = resource.id;
            this.saveToStorage();
        }
    }
});