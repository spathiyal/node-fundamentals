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

$(function() {
  let BASE_URL = 'https://deckofcardsapi.com/api/deck';


  $.getJSON(`${BASE_URL}/new/draw/`).then(data => {
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  });


  let firstCard = null;
  $.getJSON(`${BASE_URL}/new/draw/`)
    .then(data => {
      firstCard = data.cards[0];
      let deckId = data.deck_id;
      return $.getJSON(`${BASE_URL}/${deckId}/draw/`);
    })
    .then(data => {
      let secondCard = data.cards[0];
      [firstCard, secondCard].forEach(function(card) {
        console.log(
          `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
        );
      });
    });

  let deckId = null;
  let $btn = $('button');
  let $cardArea = $('#card');


  $.getJSON(`${BASE_URL}/new/shuffle/`).then(data => {
    deckId = data.deck_id;
    $btn.show();
  });

  $btn.on('click', function() {

    $.getJSON(`${BASE_URL}/${deckId}/draw/`).then(data => {
      let cardSrc = data.cards[0].image;
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
  });
});
