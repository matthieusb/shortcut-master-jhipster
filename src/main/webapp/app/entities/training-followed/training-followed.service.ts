import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TrainingFollowed } from './training-followed.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TrainingFollowed>;

@Injectable()
export class TrainingFollowedService {

    private resourceUrl =  SERVER_API_URL + 'api/training-followeds';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(trainingFollowed: TrainingFollowed): Observable<EntityResponseType> {
        const copy = this.convert(trainingFollowed);
        return this.http.post<TrainingFollowed>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(trainingFollowed: TrainingFollowed): Observable<EntityResponseType> {
        const copy = this.convert(trainingFollowed);
        return this.http.put<TrainingFollowed>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TrainingFollowed>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TrainingFollowed[]>> {
        const options = createRequestOption(req);
        return this.http.get<TrainingFollowed[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TrainingFollowed[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TrainingFollowed = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TrainingFollowed[]>): HttpResponse<TrainingFollowed[]> {
        const jsonResponse: TrainingFollowed[] = res.body;
        const body: TrainingFollowed[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TrainingFollowed.
     */
    private convertItemFromServer(trainingFollowed: TrainingFollowed): TrainingFollowed {
        const copy: TrainingFollowed = Object.assign({}, trainingFollowed);
        copy.lastVisitDate = this.dateUtils
            .convertDateTimeFromServer(trainingFollowed.lastVisitDate);
        return copy;
    }

    /**
     * Convert a TrainingFollowed to a JSON which can be sent to the server.
     */
    private convert(trainingFollowed: TrainingFollowed): TrainingFollowed {
        const copy: TrainingFollowed = Object.assign({}, trainingFollowed);

        copy.lastVisitDate = this.dateUtils.toDate(trainingFollowed.lastVisitDate);
        return copy;
    }
}
