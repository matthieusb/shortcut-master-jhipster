import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Training } from './training.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Training>;

@Injectable()
export class TrainingService {

    private resourceUrl =  SERVER_API_URL + 'api/trainings';

    constructor(private http: HttpClient) { }

    create(training: Training): Observable<EntityResponseType> {
        const copy = this.convert(training);
        return this.http.post<Training>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(training: Training): Observable<EntityResponseType> {
        const copy = this.convert(training);
        return this.http.put<Training>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Training>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Training[]>> {
        const options = createRequestOption(req);
        return this.http.get<Training[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Training[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Training = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Training[]>): HttpResponse<Training[]> {
        const jsonResponse: Training[] = res.body;
        const body: Training[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Training.
     */
    private convertItemFromServer(training: Training): Training {
        const copy: Training = Object.assign({}, training);
        return copy;
    }

    /**
     * Convert a Training to a JSON which can be sent to the server.
     */
    private convert(training: Training): Training {
        const copy: Training = Object.assign({}, training);
        return copy;
    }
}
