import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITrainingFollowed } from 'app/shared/model/training-followed.model';

export type EntityResponseType = HttpResponse<ITrainingFollowed>;
export type EntityArrayResponseType = HttpResponse<ITrainingFollowed[]>;

@Injectable()
export class TrainingFollowedService {
    private resourceUrl = SERVER_API_URL + 'api/training-followeds';

    constructor(private http: HttpClient) {}

    create(trainingFollowed: ITrainingFollowed): Observable<EntityResponseType> {
        const copy = this.convert(trainingFollowed);
        return this.http
            .post<ITrainingFollowed>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(trainingFollowed: ITrainingFollowed): Observable<EntityResponseType> {
        const copy = this.convert(trainingFollowed);
        return this.http
            .put<ITrainingFollowed>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITrainingFollowed>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITrainingFollowed[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ITrainingFollowed = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
        const jsonResponse: ITrainingFollowed[] = res.body;
        const body: ITrainingFollowed[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to TrainingFollowed.
     */
    private convertItemFromServer(trainingFollowed: ITrainingFollowed): ITrainingFollowed {
        const copy: ITrainingFollowed = Object.assign({}, trainingFollowed, {
            lastVisitDate: trainingFollowed.lastVisitDate != null ? moment(trainingFollowed.lastVisitDate) : trainingFollowed.lastVisitDate
        });
        return copy;
    }

    /**
     * Convert a TrainingFollowed to a JSON which can be sent to the server.
     */
    private convert(trainingFollowed: ITrainingFollowed): ITrainingFollowed {
        const copy: ITrainingFollowed = Object.assign({}, trainingFollowed, {
            lastVisitDate:
                trainingFollowed.lastVisitDate != null && trainingFollowed.lastVisitDate.isValid()
                    ? trainingFollowed.lastVisitDate.toJSON()
                    : null
        });
        return copy;
    }
}
