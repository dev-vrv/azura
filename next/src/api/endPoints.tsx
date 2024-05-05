export interface IEndPoint {
    path: string;
    method: string;
}
export interface IEndPoints {
    [key: string]: IEndPoint;
}

type UserPoints = 'getUser' | 'getUsers' | 'update' | 'delete' | 'createUser';


class EndPoints {
    private url: string;
    private points: {
        [key: string]: IEndPoints;
    };

    constructor(url: string = 'http://127.0.0.1:8000/') {
        this.url = url;
        this.points = {};
    }

    public getPointUser(key?: UserPoints) {
        const userManageEndPoints:IEndPoints = {
            getUser: {
                path: `${this.url}/user/controller/retrieve/`,
                method: 'GET',
            },
            getUsers: {
                path: `${this.url}/user/controller/retrieve/list/`,
                method: 'GET',
            },
            update: {
                path: `${this.url}/user/controller/update/`,
                method: 'PUT',
            },
            delete: {
                path: `${this.url}/user/controller/delete/`,
                method: 'DELETE',
            },
            createUser: {
                path: `${this.url}/user/controller/create/`,
                method: 'POST',
            },
        }
        this.points['user'] = userManageEndPoints;
        return key? this.points['user'][key] : this.points['user'];
    }
}

export { EndPoints }