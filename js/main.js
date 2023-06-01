import ObservablePromise from "./observable";

function fetching(arg) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("resolve");
      resolve({ data: arg });
    }, 1000);
  });

  // console.log('return')
  // return {data: arg}
}

const observableFetching = ObservablePromise(fetching);

async function clickHandler({ target }) {
  observableFetching(target.innerText).then((data) => {
    console.log(data);
  });
}

const btn = document.getElementById("button");
const sub = document.getElementById("sub");
btn.addEventListener("click", clickHandler);
sub.addEventListener("click", clickHandler);

observableFetching.subscribe((dataFetching) => {
  console.log("after_1", dataFetching);
});
observableFetching.subscribe(() => {
  console.log("after_2");
});
