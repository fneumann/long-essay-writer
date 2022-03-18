import { defineStore } from 'pinia';

/**
 * Layout Store
 */
export const useLayoutStore = defineStore('layout',{
    state: () => {
        return {
            expandedColumn: 'none',         // left|right|none
            leftContent: 'instructions',    // instructions
            rightContent: 'essay'           // essay
        }
    },

    getters: {
        isLeftExpanded: (state) => state.expandedColumn == 'left',
        isRightExpanded: (state) => state.expandedColumn == 'right',
        isLeftVisible: (state) => state.expandedColumn != 'right',
        isRightVisible: (state) => state.expandedColumn != 'left',
        instructionsVisible: (state) => (state.expandedColumn != 'right' && state.leftContent == 'instructions')
    },

    actions: {

        /**
         * @param bool expanded
         */
        setLeftExpanded(expanded) {
            this.expandedColumn = expanded ? 'left' : 'none';
        },

        /**
         * @param bool expanded
         */
        setRightExpanded(expanded) {
            this.expandedColumn = expanded ? 'right' : 'none';
        }


    }
});