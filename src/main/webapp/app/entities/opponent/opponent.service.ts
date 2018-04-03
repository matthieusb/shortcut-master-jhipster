import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOpponent } from 'app/shared/model/opponent.model';

export type EntityResponseType = HttpResponse<IOpponent>;
export type EntityArrayResponseType = HttpResponse<IOpponent[]>;

@Injectable()
export class OpponentService {
    private resourceUrl = SERVER_API_URL + 'api/opponents';

    constructor(private http: HttpClient) {}

    create(opponent: IOpponent): Observable<EntityResponseType> {
        const copy = this.convert(opponent);
        return this.http
            .post<IOpponent>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(opponent: IOpponent): Observable<EntityResponseType> {
        const copy = this.convert(opponent);
        return this.http
            .put<IOpponent>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IOpponent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IOpponent[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IOpponent = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
        const jsonResponse: IOpponent[] = res.body;
        const body: IOpponent[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Opponent.
     */
    private convertItemFromServer(opponent: IOpponent): IOpponent {
        const copy: IOpponent = Object.assign({}, opponent, {});
        return copy;
    }

    /**
     * Convert a Opponent to a JSON which can be sent to the server.
     */
    private convert(opponent: IOpponent): IOpponent {
        const copy: IOpponent = Object.assign({}, opponent, {});
        return copy;
    }
}
