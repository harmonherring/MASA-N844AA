import { api } from 'config';
import { history } from 'utils';

let masafetch = (resource, init={}, shouldRefresh=true) => {
    console.log(api + resource)
    return new Promise((resolve, reject) => {
        fetch(api + resource, init)
        .then((response) => {
            if ((response.status === 401) && shouldRefresh) {
                console.log("Refreshing auth token...");
                fetch(api + '/auth/refresh', {credentials: "include", method: "POST"})
                .then((response) => {
                    if (response.status == 401) {
                        console.log("Refresh failed!");
                        history.push('/login');
                    }
                    else if (response.status == 200) {
                        console.log("Refresh succeeded!");
                        masafetch(resource, init, false)
                        .then(resolve)
                        .catch(reject);
                    }
                    else {
                        console.log("This should never happen. The refresh route didn't response with a 401 or a 200.");
                        history.push('/login');
                    }
                })
            }
            else if ((response.status == 401) && !shouldRefresh) {
                console.log("Either something went really wrong, or you're just an idiot. Shouldn't be two 401s in a row.");
                history.push('/login');
            }
            else {
                resolve(response);
            }
        })
        .catch(reject)
    })
}

export default masafetch
