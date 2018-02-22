import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Shortcut } from './shortcut.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Shortcut>;

@Injectable()
export class ShortcutService {

    private resourceUrl =  SERVER_API_URL + 'api/shortcuts';

    constructor(private http: HttpClient) { }

    create(shortcut: Shortcut): Observable<EntityResponseType> {
        const copy = this.convert(shortcut);
        return this.http.post<Shortcut>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(shortcut: Shortcut): Observable<EntityResponseType> {
        const copy = this.convert(shortcut);
        return this.http.put<Shortcut>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Shortcut>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Shortcut[]>> {
        const options = createRequestOption(req);
        return this.http.get<Shortcut[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Shortcut[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Shortcut = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Shortcut[]>): HttpResponse<Shortcut[]> {
        const jsonResponse: Shortcut[] = res.body;
        const body: Shortcut[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Shortcut.
     */
    private convertItemFromServer(shortcut: Shortcut): Shortcut {
        const copy: Shortcut = Object.assign({}, shortcut);
        return copy;
    }

    /**
     * Convert a Shortcut to a JSON which can be sent to the server.
     */
    private convert(shortcut: Shortcut): Shortcut {
        const copy: Shortcut = Object.assign({}, shortcut);
        return copy;
    }
}
