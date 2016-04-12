import { browserHistory, hashHistory } from 'react-router';
let histories = { browserHistory, hashHistory };
export default histories[HISTORY_TYPE];