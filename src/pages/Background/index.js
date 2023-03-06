console.log('This is the background page.');
console.log('Put the background scripts here.');

try {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status == 'complete') {
            console.log('execute script about to run');
            chrome.scripting.executeScript({
                files: ['contentScript.bundle.js'],
                target: { tabId: tab.id }
            });
        }
    });
} catch (e) {
    console.log(e);
}