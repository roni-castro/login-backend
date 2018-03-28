const crypto = require('crypto');
class CryptoUtils{

    public encrypt = (dataToBeEncrypted: String): String => {
        console.log(dataToBeEncrypted);
        var cipher = crypto.createCipher('aes-128-ecb', '12345');
        let crypted = cipher.update(dataToBeEncrypted.toString(), 'utf8', 'base64');
        crypted += cipher.final('base64');
        console.log(crypted);
        return crypted;
    }

    public decrypt = (encryptedData: String): String => {
        console.log(encryptedData);
        const decipher = crypto.createDecipher('aes-128-ecb', '12345');
        let decrypted = decipher.update(encryptedData.toString(), 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        console.log(decrypted);
        return decrypted;
    }
}

const cryptoUtils = new CryptoUtils();
export default cryptoUtils;