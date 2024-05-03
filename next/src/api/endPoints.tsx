const url = 'http://127.0.0.1:8000';

export interface IEndPoint {
    path: string;
    method: string;
}

const endPointUser = {
    controller: {
        updateUser: {
            path: `${url}/user/controller/update/`,
            method: 'PUT',
        },
        deleteUser: {
            path: `${url}/user/controller/delete/`,
            method: 'DELETE',
        },
        getUser: {
            path: `${url}/user/controller/retrieve/`,
            method: 'GET',
        },
        getUsers: {
            path: `${url}/user/controller/retrieve/list`,
            method: 'GET',
        },
        createUser: {
            path: `${url}/user/controller/create`,
            method: 'POST',
        },
    }
}

export { endPointUser }