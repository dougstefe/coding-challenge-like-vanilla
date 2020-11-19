export class Like {

    constructor(endpoint){
        this.endpoint = endpoint;
    }

    like(postId, postTitle, userId, userName, createdDate){
        return new Promise((resolve, reject) => {
            request(
                (createdDate ? 'PUT' : 'POST'),
                (createdDate ? `${this.endpoint}/api/v1/like/user/${userId}/post/${postId}/liked` : `${this.endpoint}/api/v1/like`),
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
        });
    }

    dislike(postId, postTitle, userId, userName, createdDate){
        return new Promise((resolve, reject) => {
            request(
                (createdDate ? 'PUT' : 'POST'),
                (createdDate ? `${this.endpoint}/api/v1/like/user/${userId}/post/${postId}/liked` : `${this.endpoint}/api/v1/like`),
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
        });
    }

    undo(postId, userId){
        return new Promise((resolve, reject) => {
            request(
                'DELETE',
                `${this.endpoint}/api/v1/like/user/${userId}/post/${postId}`
            ).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }
    
    request(method, url, data) {
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