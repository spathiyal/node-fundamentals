
 /*Part1 :-  Make a request to the Numbers API
(http://numbersapi.com/) to get a fact about your
favorite number. (Make sure you get back JSON by
    including the json query key,
specific to this API. Details..*/



let BASE_URL = 'http://numbersapi.com';
let favNum = 2;

$.getJSON(`${BASE_URL}/${favNum}?json`)
.then(res =>{console.log(res)})

/*
Figure out how to get data on multiple numbers
 in a single request. Make that request and
 when you get the data back,
 put all of the number facts on the page.
*/

let favNum2 = [1,2,3]

$.getJSON(`${BASE_URL}/${favNum2}?json`)
.then(res =>{console.log(res)})
/*
3. Use the API to get 4 facts on
your favorite number. Once you have them all,
put them on the page. It’s okay if some of the facts are
 repeats.

*(Note: You’ll need to make multiple requests for this.)*
*/
Promise.all(
    Array.from({ length: 5 }, () => {
      return $.getJSON(`${BASE_URL}/${favNum}?json`);
    })
  ).then(facts => {
    facts.forEach(res => $("body").append(`<p>${res.text}</p>`));
  });
