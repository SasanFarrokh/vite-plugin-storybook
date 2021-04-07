import { addDecorator, addParameters, addLoader, addArgTypesEnhancer } from '@storybook/client-api';
import { configure } from '__STORYBOOK_FRAMEWORK__';

const stories = import.meta.globEager('./stories/*.stories.*');
configure(() => Object.values(stories), undefined, false);
