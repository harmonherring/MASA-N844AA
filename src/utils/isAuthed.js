import { masafetch } from 'utils';
import { api } from 'config';

let isAuthed = () => {
    return new Promise((resolve, reject) => {
        let init = {
            credentials: "include"
        };
        fetch(api + "/auth/check", init)
        .then((response) => {
            if (response.status === 200) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
        .catch((error) => {
            console.log("isAuthed failed: " + error);
            resolve(false);
        })
    })
}

export default isAuthed;