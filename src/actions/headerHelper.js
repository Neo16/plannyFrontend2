export class HeaderHelper{
    static getAuthorizedJsonHeader(){
        return ({
            'Accept': '*/*',
            'content-type': 'application/json', 
            'authorization': 'Bearer ' + localStorage.getItem('planny-userToken')
        });
    }
    
    static getJsonHeader(){
        return ({
            'Accept': '*/*',
            'content-type': 'application/json'       
        });
    }

    static getAuthorizedHeader(){
        return ({
            'Accept': '*/*',
            'authorization': 'Bearer ' + localStorage.getItem('planny-userToken')
        });
    }
}