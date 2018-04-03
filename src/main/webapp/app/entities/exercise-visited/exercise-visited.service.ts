import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IExerciseVisited } from 'app/shared/model/exercise-visited.model';

export type EntityResponseType = HttpResponse<IExerciseVisited>;
export type EntityArrayResponseType = HttpResponse<IExerciseVisited[]>;

@Injectable()
export class ExerciseVisitedService {
    private resourceUrl = SERVER_API_URL + 'api/exercise-visiteds';

    constructor(private http: HttpClient) {}

    create(exerciseVisited: IExerciseVisited): Observable<EntityResponseType> {
        const copy = this.convert(exerciseVisited);
        return this.http
            .post<IExerciseVisited>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(exerciseVisited: IExerciseVisited): Observable<EntityResponseType> {
        const copy = this.convert(exerciseVisited);
        return this.http
            .put<IExerciseVisited>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IExerciseVisited>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IExerciseVisited[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IExerciseVisited = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
        const jsonResponse: IExerciseVisited[] = res.body;
        const body: IExerciseVisited[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to ExerciseVisited.
     */
    private convertItemFromServer(exerciseVisited: IExerciseVisited): IExerciseVisited {
        const copy: IExerciseVisited = Object.assign({}, exerciseVisited, {});
        return copy;
    }

    /**
     * Convert a ExerciseVisited to a JSON which can be sent to the server.
     */
    private convert(exerciseVisited: IExerciseVisited): IExerciseVisited {
        const copy: IExerciseVisited = Object.assign({}, exerciseVisited, {});
        return copy;
    }
}
