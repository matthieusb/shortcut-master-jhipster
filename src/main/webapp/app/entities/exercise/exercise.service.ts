import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IExercise } from 'app/shared/model/exercise.model';

export type EntityResponseType = HttpResponse<IExercise>;
export type EntityArrayResponseType = HttpResponse<IExercise[]>;

@Injectable()
export class ExerciseService {
    private resourceUrl = SERVER_API_URL + 'api/exercises';

    constructor(private http: HttpClient) {}

    create(exercise: IExercise): Observable<EntityResponseType> {
        const copy = this.convert(exercise);
        return this.http
            .post<IExercise>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(exercise: IExercise): Observable<EntityResponseType> {
        const copy = this.convert(exercise);
        return this.http
            .put<IExercise>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IExercise>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IExercise[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IExercise = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
        const jsonResponse: IExercise[] = res.body;
        const body: IExercise[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Exercise.
     */
    private convertItemFromServer(exercise: IExercise): IExercise {
        const copy: IExercise = Object.assign({}, exercise, {});
        return copy;
    }

    /**
     * Convert a Exercise to a JSON which can be sent to the server.
     */
    private convert(exercise: IExercise): IExercise {
        const copy: IExercise = Object.assign({}, exercise, {});
        return copy;
    }
}
