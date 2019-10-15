import ProjectCard from './src/ProjectCard';
import ProjectCardList from './src/ProjectCardList';

const Card = { ProjectCard, ProjectCardList };

Card.install = vue => {
    vue.component(ProjectCard.name, ProjectCard);
    vue.component(ProjectCardList.name, ProjectCardList);
};

export default Card;
