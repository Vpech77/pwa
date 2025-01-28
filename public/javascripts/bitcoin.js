

const url_bitcoin = "https://api.coincap.io/v2/assets/bitcoin/history?interval=d1";
const url_usd = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";

let p1 = fetch(url_bitcoin)
.then(result => result.json())
.then(data => {
    return {
        valeurs: data.data.map(val => val.priceUsd),
        dates: data.data.map(val => val.date)
    }
})
.catch(console.error)

let p2 = fetch(url_usd)
.then(result => result.json())
.then(data => data.usd.eur)
.catch(console.error)

const promises = [p1, p2];

Promise.all(promises)
.then(([{dates, valeurs}, taux]) => {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [{
          label: '# of Votes',
          data: valeurs.map(x => x * taux),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
})