let url = 'http://numbersapi.com';
let favNum = 2;

async function numberFacts1(){
    let data = await $.getJSON(`${url}/${favNum}?json`);
    console.log(data);
}
numberFacts1();

let favNum2 = [1,2,3];
async function numberFacts2(){
    let data = await $.getJSON(`${url}/${favNum2}?json`);
    console.log(data);
}
numberFacts2();

async function numberFacts3(){
let promise = await Promise.all(
    Array.from({ length: 5 }, () => {
      return $.getJSON(`${url}/${favNum}?json`);
    })
  )
  promise.forEach(res => $("body").append(`<p>${res.text}</p>`));
}

numberFacts3();