// set the state in local storage, once we have the access token delete it
// get the query string params
// do a fetch
// get the data

// request.query.code && request.query.state
// if we done have a code and state then do this
if () {
    const state = new Date().getTime();
    window.location = `https://relaxed-meninsky-eaf91e.netlify.com/.netlify/functions/accessToken?state=${state}`;
}


const startApp = (result) => {
    console.log(result);
    fetch('https://api.monzo.com/transactions?account_id=acc_00009cHB2QXoGDnGy8XFkf', { 
        method: 'get', 
        headers: {
          'authorization': `Bearer ${result.access_token}`
        }
      }).then((res) => res.json())
      .then((res) => {
        const list = res.transactions.map((transaction) => {
            return `<li>${transaction.description} - ${Math.abs(transaction.local_amount)/100} - ${transaction.created}</li>`
        }).join('');

        document.querySelector('.root').innerHTML = `<ul>${list}</ul>`;
      });
}

const urlParams = new URLSearchParams(window.location.search);
fetch(`/access-token?code=${urlParams.get('code')}&state=${urlParams.get('state')}`)
    .then((res) => res.json())
    .then(startApp);
