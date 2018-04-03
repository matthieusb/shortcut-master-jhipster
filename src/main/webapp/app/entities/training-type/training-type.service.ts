import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITrainingType } from 'app/shared/model/training-type.model';

export type EntityResponseType = HttpResponse<ITrainingType>;
export type EntityArrayResponseType = HttpResponse<ITrainingType[]>;

@Injectable()
export class TrainingTypeService {
    private resourceUrl = SERVER_API_URL + 'api/training-types';

    constructor(private http: HttpClient) {}

    create(trainingType: ITrainingType): Observable<EntityResponseType> {
        const copy = this.convert(trainingType);
        return this.http
            .post<ITrainingType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(trainingType: ITrainingType): Observable<EntityResponseType> {
        const copy = this.convert(trainingType);
        return this.http
            .put<ITrainingType>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITrainingType>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITrainingType[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ITrainingType = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
        const jsonResponse: ITrainingType[] = res.body;
        const body: ITrainingType[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to TrainingType.
     */
    private convertItemFromServer(trainingType: ITrainingType): ITrainingType {
        const copy: ITrainingType = Object.assign({}, trainingType, {});
        return copy;
    }

    /**
     * Convert a TrainingType to a JSON which can be sent to the server.
     */
    private convert(trainingType: ITrainingType): ITrainingType {
        const copy: ITrainingType = Object.assign({}, trainingType, {});
        return copy;
    }
}
