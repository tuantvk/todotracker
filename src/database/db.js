import Vasern from 'vasern';

import { TodosModel } from './Todos';

export default new Vasern({
  schemas: [TodosModel],
});
