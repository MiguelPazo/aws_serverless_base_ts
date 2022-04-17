/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */

export interface IUploadService {

    sendToS3(file: string): Promise<Boolean>;
}
