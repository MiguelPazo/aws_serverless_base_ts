/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */

export interface ISqsService {

    send(data: any, queueUrl: string): Promise<Boolean>;
}
