import { defineStore } from 'pinia';

/**
 * Layout Store
 */
export const useLayoutStore = defineStore('layout',{
    state: () => {
        return {
            expanded: 'left',               // left|right|none
            leftContent: 'instructions',    // instructions
            rightContent: 'essay'           // essay
        }
    },

    actions: {

    }
});