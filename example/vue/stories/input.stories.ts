import { h } from 'vue';

export default {
    title: 'Input component'
};

export const input = () => h('input', { type: 'text', value: 'simple1' });
export const input2 = () => h('input', { type: 'text', value: 'simple2' });
export const input3 = () => h('input', { type: 'text', value: 'simple3' });
