const ITEMS = 'https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users'
//проверка запросов сервера
const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function getItems() {
   return fetch(ITEMS, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
    .then(checkReponse)
}

export default getItems