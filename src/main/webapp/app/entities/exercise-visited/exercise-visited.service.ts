import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ExerciseVisited } from './exercise-visited.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ExerciseVisited>;

@Injectable()
export class ExerciseVisitedService {

    private resourceUrl =  SERVER_API_URL + 'api/exercise-visiteds';

    constructor(private http: HttpClient) { }

    create(exerciseVisited: ExerciseVisited): Observable<EntityResponseType> {
        const copy = this.convert(exerciseVisited);
        return this.http.post<ExerciseVisited>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(exerciseVisited: ExerciseVisited): Observable<EntityResponseType> {
        const copy = this.convert(exerciseVisited);
        return this.http.put<ExerciseVisited>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ExerciseVisited>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ExerciseVisited[]>> {
        const options = createRequestOption(req);
        return this.http.get<ExerciseVisited[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ExerciseVisited[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ExerciseVisited = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ExerciseVisited[]>): HttpResponse<ExerciseVisited[]> {
        const jsonResponse: ExerciseVisited[] = res.body;
        const body: ExerciseVisited[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ExerciseVisited.
     */
    private convertItemFromServer(exerciseVisited: ExerciseVisited): ExerciseVisited {
        const copy: ExerciseVisited = Object.assign({}, exerciseVisited);
        return copy;
    }

    /**
     * Convert a ExerciseVisited to a JSON which can be sent to the server.
     */
    private convert(exerciseVisited: ExerciseVisited): ExerciseVisited {
        const copy: ExerciseVisited = Object.assign({}, exerciseVisited);
        return copy;
    }
}
