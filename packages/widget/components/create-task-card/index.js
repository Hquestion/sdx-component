import CreateTaskCard from './src/CreateTaskCard';

CreateTaskCard.install = vue => {
    vue.component(CreateTaskCard.name, CreateTaskCard);
};

export default CreateTaskCard;
