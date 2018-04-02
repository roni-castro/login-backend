import connection from '../MysqlConnection';
import {UserModel} from '../model/UserModel'

class UserDbController {

    public findUserByUserNameId = (userName): Promise<UserModel> => {
        return new Promise<UserModel>((resolve, reject) => {
            connection.query(
                "SELECT * FROM tb_user WHERE user_name = ?", 
                [userName], function(err, results){
                if(err) {
                    return reject(err);
                } else {
                    if(results.length > 0){
                        let userFromDB = results[0];
                        let user = new UserModel(userFromDB.id, userFromDB.user_name, userFromDB.first_name, userFromDB.last_name, userFromDB.pass_hash);
                        return resolve(user);
                    } else{
                        return resolve(null);
                    }
                }
            });
        })
    };
}

export default new UserDbController();