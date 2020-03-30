import isEmpty from "is-empty";

function postTabHook(tab_search_list, query) {
  // when nothing is entered
  if (isEmpty(query)) {
    return { result: -1 };
  }

  // when anything but query tab is not defined.
  if (isEmpty(query["tab"])) {
    return { result: -2 };
  }

  let query_tab_key = -1;
  tab_search_list.map(t => {
    if (t.tab === query["tab"]) {
      query_tab_key = t.key;
      return;
    }
  });

  // when tab is defined but out of key value
  if (query_tab_key === -1) {
    return { result: -3 };
  }

  return { result: 1, tab: query["tab"], key: query_tab_key };
}

export default postTabHook;
