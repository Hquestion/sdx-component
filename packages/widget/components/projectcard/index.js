import ProjectCard from './src/ProjectCard';
import ProjectCardList from './src/ProjectCardList';

const Card = { ProjectCard, ProjectCardList };

Card.install = vue => {
    vue.components(ProjectCard.name, ProjectCard);
    vue.components(ProjectCardList.name, ProjectCardList);
};

export default Card;