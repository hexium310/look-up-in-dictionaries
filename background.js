const sites = [
  {
    name: 'Weblio',
    url: 'https://ejje.weblio.jp/content/%s'
  },
  {
    name: 'Wiktionary',
    url: 'https://en.wiktionary.org/wiki/%s',
  },
];

for (const { name } of sites) {
  chrome.contextMenus.create({
    id: `${name}`,
    title: `Look up "%s" in ${name}`,
    contexts: ['selection'],
    type: 'normal',
  });
}

chrome.contextMenus.onClicked.addListener(({ menuItemId, selectionText }) => {
  const url = sites.find((element) => element.name === menuItemId)?.url.replace('%s', selectionText);

  if (url === null || url === undefined) {
    return;
  }

  chrome.tabs.create({ url });
});
