import Card from '../components/Card.vue';
export default {
    title: 'Library/Card',
    component: Card,
    tags: ['autodocs'],
    argTypes: {},
};

export const Default = {
    args: {
        title: 'Card Title',
        body: 'Card Body',
        footer: 'Card Footer',
    },
};

export const Title = {
    args: {
        title: 'Card Title'
    },
};