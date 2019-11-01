import SubjectCard from './src/SubjectCard';
import SubjectCardList from './src/SubjectCardList';
const SubCard = { SubjectCard, SubjectCardList };

SubCard.install = vue => {
    vue.component(SubjectCard.name, SubjectCard);
    vue.component(SubjectCardList.name, SubjectCardList);
};

export default SubCard;