export interface IEndPoint {
    path: string;
    method: string;
}
export interface IEndPoints {
    [key: string]: IEndPoint;
}

type UserPoints = 'getUser' | 'getUsers' | 'update' | 'delete' | 'create';


class EndPoints {
    private url: string;
    private points: {
        [key: string]: IEndPoints;
    };

    constructor(url: string = 'http://127.0.0.1:8000/') {
        this.url = url;
        this.points = {};
    }

    public getPointUser(key: UserPoints): IEndPoint {
        const userManageEndPoints:IEndPoints = {
            getUser: {
                path: `${this.url}admin/users/`,
                method: 'GET',
            },
            getUsers: {
                path: `${this.url}admin/users/list/`,
                method: 'GET',
            },
            update: {
                path: `${this.url}admin/users/update/`,
                method: 'PUT',
            },
            delete: {
                path: `${this.url}admin/users/delete/`,
                method: 'DELETE',
            },
            create: {
                path: `${this.url}admin/users/create/`,
                method: 'POST',
            },
        }
        this.points['user'] = userManageEndPoints;
        return this.points['user'][key];
    }
}

export { EndPoints }