import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQuestion } from 'app/shared/model/question.model';

export type EntityResponseType = HttpResponse<IQuestion>;
export type EntityArrayResponseType = HttpResponse<IQuestion[]>;

@Injectable()
export class QuestionService {
    private resourceUrl = SERVER_API_URL + 'api/questions';

    constructor(private http: HttpClient) {}

    create(question: IQuestion): Observable<EntityResponseType> {
        const copy = this.convert(question);
        return this.http
            .post<IQuestion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(question: IQuestion): Observable<EntityResponseType> {
        const copy = this.convert(question);
        return this.http
            .put<IQuestion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IQuestion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IQuestion[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IQuestion = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
        const jsonResponse: IQuestion[] = res.body;
        const body: IQuestion[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Question.
     */
    private convertItemFromServer(question: IQuestion): IQuestion {
        const copy: IQuestion = Object.assign({}, question, {});
        return copy;
    }

    /**
     * Convert a Question to a JSON which can be sent to the server.
     */
    private convert(question: IQuestion): IQuestion {
        const copy: IQuestion = Object.assign({}, question, {});
        return copy;
    }
}
