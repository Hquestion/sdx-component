import CreateProjectCard from './src/CreateProjectCard';

CreateProjectCard.install = vue => {
    vue.component(CreateProjectCard.name, CreateProjectCard);
};

export default CreateProjectCard;