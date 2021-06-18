import {
  decrement, increment
} from '../../../redux/reducers/counter.slice';
import {
  useDispatch, useSelector
} from 'react-redux';
import { ExampleRepository } from '../../../services/repositories/example.repository';
import { Markup } from 'interweave';
import { RootState } from '../../../redux/reducers/root.reducer';
import styles from './example.module.scss';
import { TYPES } from '../../../services/configuration/types';
import { useQuery } from 'react-query';
import { useRepositoryIoc } from '../../../services/configuration/context';
import { withContent } from '../content-inyector/index';

const CONTENT_ID = '2vpEMaW26HiSJCLP7mP6zw';

type ExampleProps = {
  contentId: string,
  content: {
    text1: string;
    backgroundImage: string;
  };
}

const Example = ({content} : ExampleProps) => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const { container } = useRepositoryIoc();
  const exampleRepository: ExampleRepository = container.get(TYPES.ExampleRepository);

  const { data: exampleData } = useQuery('exampleData', () => exampleRepository.getData());

  return (
    <div className={styles.example}>
      <Markup content={content.text1}/>
      <img src={content.backgroundImage} />

      <h1>{exampleData?.message}</h1>
      <div>
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <p>{count}</p>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
    </div>
  );
};

Example.contentId = CONTENT_ID;

Example.defaultProps = { content: {
  backgroundImage: null,
  text1: 'Texto defecto'
} };

export default withContent(Example);
