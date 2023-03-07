console.log('This is the background page.');

let neededTabId;

try {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status == 'complete' && tab.url.includes('twitter')) {
            neededTabId = tabId;
            console.log('complete');

            setListeners();
            // console.log('execute script about to run');
            // chrome.scripting.executeScript({
            //     files: ['contentScript.bundle.js'],
            //     target: { tabId: tab.id }
            // });

        }
    });
} catch (e) {
    console.log(e);
}

function requestHandler(req) {
    // tweets loaded, look for elon tweets
    if (req.url.includes('UserTweets')) {
        console.log('paulius req.url:', req.url);
        // chrome.runtime.sendMessage('kckpbecdjciaioacmoeomgobhfomaolh', { action: "bringPeaceOfMind" });
        chrome.tabs.sendMessage(neededTabId, {
            action: "bringPeaceOfMind"
        });
    }
}
function setListeners() {
    chrome.webRequest.onCompleted.addListener(requestHandler,
        { urls: ["<all_urls>"] });
}
function removeListeners() {
    chrome.webRequest.onCompleted.removeListener(requestHandler);
}