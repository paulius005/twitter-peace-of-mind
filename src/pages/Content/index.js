import { printLine } from './modules/print';
import $ from 'jquery';

addEventListener("scroll", (event) => { });

onscroll = (event) => {
  bringPeaceOfMind();
};

setTimeout(() => {
  bringPeaceOfMind();
}, 2000);

function bringPeaceOfMind() {
  const greatElonTweet = 'I am working on SpaceX & Tesla and it\'s going great!';
  const elonTweets = $('article').find('a[href$="/elonmusk"] div span:contains("@elonmusk")').toArray();

  if (elonTweets.length) {

    elonTweets.forEach(elonTweetEl => {
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

        if (!(textSpanText.includes('tesla') ||
          textSpanText.includes('rockets') ||
          textSpanText.includes('spacex') ||
          textSpanText.includes('launch') ||
          textSpanText.includes('giga') ||
          textSpanText.includes('liftoff') ||
          textSpanText.includes('energy')
        )) {
          elonTweetEl.closest('article').firstChild.firstChild.children[1].children[1].children[1].firstChild.firstChild.textContent = 'I am working on SpaceX & Tesla and it\'s going great!';
          elonTweetEl.closest('article').firstChild.firstChild.children[1].children[1].children[2].firstChild.remove();
        }
      } catch (error) {
        console.log(error);
      }
    });

  }
}