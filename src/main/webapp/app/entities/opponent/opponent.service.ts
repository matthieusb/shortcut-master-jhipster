import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Opponent } from './opponent.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Opponent>;

@Injectable()
export class OpponentService {

    private resourceUrl =  SERVER_API_URL + 'api/opponents';

    constructor(private http: HttpClient) { }

    create(opponent: Opponent): Observable<EntityResponseType> {
        const copy = this.convert(opponent);
        return this.http.post<Opponent>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(opponent: Opponent): Observable<EntityResponseType> {
        const copy = this.convert(opponent);
        return this.http.put<Opponent>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Opponent>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Opponent[]>> {
        const options = createRequestOption(req);
        return this.http.get<Opponent[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Opponent[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Opponent = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Opponent[]>): HttpResponse<Opponent[]> {
        const jsonResponse: Opponent[] = res.body;
        const body: Opponent[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Opponent.
     */
    private convertItemFromServer(opponent: Opponent): Opponent {
        const copy: Opponent = Object.assign({}, opponent);
        return copy;
    }

    /**
     * Convert a Opponent to a JSON which can be sent to the server.
     */
    private convert(opponent: Opponent): Opponent {
        const copy: Opponent = Object.assign({}, opponent);
        return copy;
    }
}
