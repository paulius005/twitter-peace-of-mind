import $ from 'jquery';
import { throttle as _throttle } from 'lodash';

addEventListener("scroll", onscroll);

onscroll = _throttle((event) => {
  console.log('onscroll');
  bringPeaceOfMind();
}, 500);

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (request.action === "bringPeaceOfMind") {
      bringPeaceOfMind();
      sendResponse({ farewell: "goodbye" });
    }
  }
);

function bringPeaceOfMind() {
  const greatElonTweet = 'I am working on SpaceX & Tesla and it\'s going great!';
  const greatElonThirdPersonTweet = 'Elon is working on SpaceX & Tesla and it\'s going great!';

  const elonTweets = $('article').find('a[href$="/elonmusk"] div span:contains("@elonmusk")').toArray();
  const elonRetweets = $('article').find('a[href$="/elonmusk"] span:contains("Retweeted")').toArray();

  const doHtmlStuff = (elonTweetEl, replacementText) => {
    try {
      const textSpanParent = elonTweetEl.closest('article').firstChild.firstChild.children[1].children[1].children[1].firstChild;

      // no text tweet... most likely meme. Must delete
      if (!textSpanParent) {
        const textSpanParentParentParent = elonTweetEl.closest('article').firstChild.firstChild.children[1].children[1];

        elonTweetEl.closest('article').remove();

        return;
      }

      const textSpan = textSpanParent.firstChild
      const textSpanText = textSpan.textContent;

      if (textSpanText == greatElonTweet) {
        return;
      }

      if (!(textSpanText.toLowerCase().includes('tesla') ||
        textSpanText.toLowerCase().includes('rockets') ||
        textSpanText.toLowerCase().includes('spacex') ||
        textSpanText.toLowerCase().includes('launch') ||
        textSpanText.toLowerCase().includes('giga') ||
        textSpanText.toLowerCase().includes('liftoff') ||
        textSpanText.toLowerCase().includes('starship') ||
        textSpanText.toLowerCase().includes('dragon') ||
        textSpanText.toLowerCase().includes('energy')
      )) {
        // remove emojis at the beginning
        while (elonTweetEl.closest('article').firstChild.firstChild.children[1].children[1].children[1].firstChild.firstChild.toString().includes('Image')) {
          elonTweetEl.closest('article').firstChild.firstChild.children[1].children[1].children[1].firstChild.firstChild.remove();
        }

        // replace text
        elonTweetEl.closest('article').firstChild.firstChild.children[1].children[1].children[1].firstChild.firstChild.textContent = replacementText;

        // remove ending image
        elonTweetEl.closest('article').firstChild.firstChild.children[1].children[1].children[2].firstChild.remove();

        // remove ending link
        elonTweetEl.closest('article').firstChild.firstChild.children[1].children[1].children[1].firstChild.children[1].remove();
      }
    } catch (error) {
      console.log(error);
    }
  }

  elonTweets.forEach(elonTweetEl => doHtmlStuff(elonTweetEl, greatElonTweet));
  elonRetweets.forEach(elonTweetEl => doHtmlStuff(elonTweetEl, greatElonThirdPersonTweet));
}