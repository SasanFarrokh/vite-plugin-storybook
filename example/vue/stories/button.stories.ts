import { h } from 'vue';
import Button from './button.vue';

export default {
    title: 'Button component'
};

export const simple = () => h(Button, {}, () => 'Hello')
export const simple2 = () => h(Button, {}, () => 'Hello2')
export const simple3 = () => h(Button, {}, () => 'Hello3')
export const simple4 = () => h(Button, {}, () => 'Hello4')
