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
        setData(data) {
            this.resources = data.resources;
        },

        async loadFromStorage() {
            try {
                const data = await storage.getItem('resources');
                this.setData(data);
            } catch (err) {
                console.log(err);
            }
        },

        async loadFromData(data) {
            try {
                await storage.setItem('resources', data);
                this.setData(data);
            } catch (err) {
                console.log(err);
            }
        },

        selectResource(resource) {
            this.active_id = resource.id;
        }
    }
});