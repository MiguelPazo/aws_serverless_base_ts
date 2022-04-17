/**
 * Created by Miguel Pazo (https://miguelpazo.com)
 */

export interface IGenericResponse<T> {
    success: boolean;
    data?: T;
    error?: object;
}

export interface IPaginatedRequest<T> {
    filter?: T;
    page: number;
    count: number;
    source?: Array<any>;
    order?: { field: string, type: string };
}

export interface IPaginatedResponse<T> {
    success: boolean;
    items?: Array<T>;
    recordsTotal: number;
    page: number;
    count: number;
}

