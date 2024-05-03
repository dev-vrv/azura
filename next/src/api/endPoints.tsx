const url = 'http://127.0.0.1:8000';

export interface IEndPoint {
    path: (...args: any[]) => string;
    method: string;
}

const endPointUser = {
    controller: {
        updateUser: {
            path: (id: number) => `${url}/user/controller/update/${id}`,
            method: 'PUT',
        },
        deleteUser: {
            path: (id: number) => `${url}/user/controller/delete/${id}`,
            method: 'DELETE',
        },
        getUser: {
            path: (id: number) => `${url}/user/controller/retrieve/${id}`,
            method: 'GET',
        },
        getUsers: {
            path: () => `${url}/user/controller/retrieve/list`,
            method: 'GET',
        },
        createUser: {
            path: () => `${url}/user/controller/create`,
            method: 'POST',
        },
    }
}

export { endPointUser }