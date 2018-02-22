import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TrainingType } from './training-type.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TrainingType>;

@Injectable()
export class TrainingTypeService {

    private resourceUrl =  SERVER_API_URL + 'api/training-types';

    constructor(private http: HttpClient) { }

    create(trainingType: TrainingType): Observable<EntityResponseType> {
        const copy = this.convert(trainingType);
        return this.http.post<TrainingType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(trainingType: TrainingType): Observable<EntityResponseType> {
        const copy = this.convert(trainingType);
        return this.http.put<TrainingType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TrainingType>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TrainingType[]>> {
        const options = createRequestOption(req);
        return this.http.get<TrainingType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TrainingType[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TrainingType = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TrainingType[]>): HttpResponse<TrainingType[]> {
        const jsonResponse: TrainingType[] = res.body;
        const body: TrainingType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TrainingType.
     */
    private convertItemFromServer(trainingType: TrainingType): TrainingType {
        const copy: TrainingType = Object.assign({}, trainingType);
        return copy;
    }

    /**
     * Convert a TrainingType to a JSON which can be sent to the server.
     */
    private convert(trainingType: TrainingType): TrainingType {
        const copy: TrainingType = Object.assign({}, trainingType);
        return copy;
    }
}
