/* Part1 :-  Make a request to the Deck of Cards
API to request a single card from a newly
shuffled deck. Once you have the card, 
console.log the value and the suit
(e.g. “5 of spades”, “queen of diamonds”).*/





/*Make a request to the deck of cards API to
request a single card from a newly shuffled deck.
Once you have the card, make a request to the
same API to get one more card from the same deck.
*/


/*
Build an HTML page that lets you draw cards from a deck.
When the page loads, go to the Deck of Cards API to create a new deck,
and show a button on the page that will let you draw a card. Every time you click the button, display a new card,
until there are no cards left in the deck. */

$(function () {
  let url = 'https://deckofcardsapi.com/api/deck';

  async function cardPart1() {
    let data = await $.getJSON(`${url}/new/draw/`);
    let { suit, value } = data.cards[0];
    console.log(` Part1 : ${value.toLowerCase()} of ${suit.toLowerCase()}`);
  }

  cardPart1()
  async function cardPart2() {
    let firstCard = await $.getJSON(`${url}/new/draw/`);
    let deckId = firstCard.deck_id;
    let secondCard = await $.getJSON(`${url}/${deckId}/draw/`);
    [firstCard, secondCard].forEach(card => {
      let { suit, value } = card.cards[0];
      console.log(` Part2 : ${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
  }
  cardPart2()

  async function cardPart3() {
    let $btn = $('button');
    let $cardArea = $('#card');
    let data = await $.getJSON(`${url}/new/shuffle/`)
    deckId = data.deck_id;
    console.log("here")
    $btn.show().on('click', async function () {

        let card = await $.getJSON(`${url}/${deckId}/draw/`)
        let cardSrc = card.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;

      $cardArea.append(
        $('<img>', {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        }),

      );
      if (data.remaining === 0) $btn.remove();
    });

  };
  cardPart3()
});