// set the state in local storage, once we have the access token delete it
// get the query string params
// do a fetch
// get the data

// request.query.code && request.query.state
// if we done have a code and state then do this
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const state = urlParams.get('state'); 

if (code === null) {
    const state = new Date().getTime();
    window.location = `https://relaxed-meninsky-eaf91e.netlify.com/.netlify/functions/oauth?state=${state}`;
}

if (code !== null && state !== null) {
    const startApp = (result) => {
        console.log(result);
        fetch('https://api.monzo.com/transactions?account_id=acc_00009cHB2QXoGDnGy8XFkf', { 
            method: 'get', 
            headers: {
              'authorization': `Bearer ${result.access_token}`
            }
          }).then((res) => res.json())
          .then((res) => {
              console.log(res);
            const list = res.transactions.map((transaction) => {
                return `<li>${transaction.description} - ${Math.abs(transaction.local_amount)/100} - ${transaction.created}</li>`
            }).join('');
    
            document.querySelector('.root').innerHTML = `<ul>${list}</ul>`;
          });
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    fetch(`https://relaxed-meninsky-eaf91e.netlify.com/.netlify/functions/accessToken?code=${code}&state=${state}`)
        .then((res) => res.json())
        .then(startApp);
}
