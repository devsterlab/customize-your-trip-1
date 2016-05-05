import { useRouterHistory } from 'react-router';
import { createHistory, createHashHistory } from 'history';
let createHistories = { createHistory, createHashHistory };
let crHist = createHistories[HISTORY_TYPE];

let history = useRouterHistory(crHist)({
  basename: BASE_NAME
});

export default history;