require('isomorphic-fetch');
var linkToJson = 'http://beta.json-generator.com/api/json/get/V1N4803Tg';

module.exports = function () {
    return fetch(linkToJson)
        .then(response => {
            if (response.status >= 400) {
                throw new Error('Bad response from server');
            }
            return response.json();
        });
};