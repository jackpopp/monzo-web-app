import renderApp from './components';
// set the state in local storage, once we have the access token delete it
// get the query string params
// do a fetch
// get the data

// request.query.code && request.query.state
// if we done have a code and state then do this
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const state = urlParams.get('state'); 
const accessToken = localStorage.getItem('accessToken');

if (code === null && accessToken === null) {
    const state = new Date().getTime();
    window.location = `https://relaxed-meninsky-eaf91e.netlify.com/.netlify/functions/oauth?state=${state}`;
}

function getToken() {
    const urlParams = new URLSearchParams(window.location.search);
    return fetch(`https://relaxed-meninsky-eaf91e.netlify.com/.netlify/functions/accessToken?code=${code}&state=${state}`)
        .then((res) => res.json())
        .then((res) => {
            localStorage.setItem('accessToken', res.access_token);
            return res.access_token
        });
}

function formatAmount(amount) {
    return `£${((amount > 0 ? Math.abs(amount) : amount) / 100).toFixed(2)}`;
}

function startApp(accessToken) {
    fetch('https://api.monzo.com/transactions?account_id=acc_00009cHB2QXoGDnGy8XFkf', { 
        method: 'get', 
        headers: {
          'authorization': `Bearer ${accessToken}`
        }
      }).then((res) => res.json())
      .then((res) => {
        const transactions = res.transactions;
        transactions.reverse();
        renderApp({transactions});

        /*const list = transactions.map((transaction) => {
            return `<li><p>${transaction.description}</p> <p>${formatAmount(transaction.local_amount)} - ${transaction.category} - ${transaction.created}</p></li>`
        }).join('');

        document.querySelector('.root').innerHTML = `<ul>${list}</ul>`;*/
      });
}


if ((code !== null && state !== null) || (accessToken)) {
    if (accessToken) {
        startApp(accessToken)
    } else {
        getToken().then(result => startApp(result));
    }
}
