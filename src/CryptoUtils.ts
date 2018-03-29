const crypto = require('crypto');
class CryptoUtils{

    public encrypt = (dataToBeEncrypted: String): String => {
        var cipher = crypto.createCipher('aes-128-ecb', '12345');
        let crypted = cipher.update(dataToBeEncrypted.toString(), 'utf8', 'base64');
        crypted += cipher.final('base64');
        return crypted;
    }

    public decrypt = (encryptedData: String): String => {
        const decipher = crypto.createDecipher('aes-128-ecb', '12345');
        let decrypted = decipher.update(encryptedData.toString(), 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}

const cryptoUtils = new CryptoUtils();
export default cryptoUtils;