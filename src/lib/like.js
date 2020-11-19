export class ChallengeLike {

    constructor(config){
        this.endpoint = config.endpoint;
        this.trackCode = config.trackCode;
    }

    auth(){
        return new Promise((resolve, reject) => {
            const authLike = window.localStorage.getItem("auth_like"); 
            if(authLike){
                resolve(JSON.parse(authLike));
            }
            request(
                'post',
                `${this.endpoint}/api/v1/auth`,
                {
                    'trackCode': this.trackCode
                }
            ).then((data) => {
                window.localStorage.setItem("auth_like", JSON.stringify(data));
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }

    get(postId, userId){
        return new Promise((resolve, reject) => {
            auth()
                .then(
                    response => {
                        resolve(
                            new Promise((resolve, reject) => {
                                request(
                                    'GET',
                                    `${this.endpoint}/api/v1/like/user/${userId}/post/${postId}`,
                                    response.accessToken
                                ).then((data) => {
                                    resolve(data);
                                }, (error) => {
                                    reject(error);
                                });
                            })
                        );
                    },
                    error => {
                        reject(error);
                    }
                )
        });
    }

    like(postId, postTitle, userId, userName, createdDate){
        return new Promise((resolve, reject) => {
            auth()
                .then(
                    response => {
                        resolve(
                            new Promise((resolve, reject) => {
                                request(
                                    (createdDate ? 'PUT' : 'POST'),
                                    (createdDate ? `${this.endpoint}/api/v1/like/user/${userId}/post/${postId}/liked` : `${this.endpoint}/api/v1/like`),
                                    response.accessToken,
                                    (createdDate ? {
                                            'liked': true
                                        } : {
                                            'id': postId,
                                            'user': {
                                                'id': userId,
                                                'name': userName
                                            },
                                            'title': postTitle,
                                            'liked': true
                                        }
                                    )
                                ).then((data) => {
                                    resolve(data);
                                }, (error) => {
                                    reject(error);
                                });
                            })
                        );
                    },
                    error => {
                        reject(error);
                    }
                )
        });
    }

    dislike(postId, postTitle, userId, userName, createdDate){
        return new Promise((resolve, reject) => {
            auth()
                .then(
                    response => {
                        resolve(
                            new Promise((resolve, reject) => {
                                request(
                                    (createdDate ? 'PUT' : 'POST'),
                                    (createdDate ? `${this.endpoint}/api/v1/like/user/${userId}/post/${postId}/liked` : `${this.endpoint}/api/v1/like`),
                                    response.accessToken,
                                    (createdDate ? {
                                            'liked': false
                                        } : {
                                            'id': postId,
                                            'user': {
                                                'id': userId,
                                                'name': userName
                                            },
                                            'title': postTitle,
                                            'liked': false
                                        }
                                    )
                                ).then((data) => {
                                    resolve(data);
                                }, (error) => {
                                    reject(error);
                                });
                            })
                        );
                    },
                    error => {
                        reject(error);
                    }
                )
        });
    }

    undo(postId, userId){
        return new Promise((resolve, reject) => {
            auth()
                .then(
                    response => {
                        resolve(
                            new Promise((resolve, reject) => {
                                request(
                                    'DELETE',
                                    `${this.endpoint}/api/v1/like/user/${userId}/post/${postId}`,
                                    response.accessToken
                                ).then((data) => {
                                    resolve(data);
                                }, (error) => {
                                    reject(error);
                                });
                            })
                        );
                    },
                    error => {
                        reject(error);
                    }
                )
        });
    }
    
    request(method, url, accessToken, data) {
        auth();
        return new Promise((resolve, reject) => {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open(method, url, true);

            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState === XMLHttpRequest.DONE) {
                    if (xmlHttp.status === 200 || xmlHttp.status === 201 || xmlHttp.status === 204) {
                        resolve(JSON.parse(xmlHttp.responseText));
                    } else {
                        reject(JSON.parse(xmlHttp.responseText));
                    }
                }
            }
            xmlHttp.setRequestHeader('Authorization', `Bearer ${accessToken}`);
            if(data){
                xmlHttp.setRequestHeader('Content-Type', 'application/json');
                xmlHttp.send(JSON.stringify(data));
            }
            else{
                xmlHttp.send();
            }
        });
    }
}