import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Keystroke } from './keystroke.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Keystroke>;

@Injectable()
export class KeystrokeService {

    private resourceUrl =  SERVER_API_URL + 'api/keystrokes';

    constructor(private http: HttpClient) { }

    create(keystroke: Keystroke): Observable<EntityResponseType> {
        const copy = this.convert(keystroke);
        return this.http.post<Keystroke>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(keystroke: Keystroke): Observable<EntityResponseType> {
        const copy = this.convert(keystroke);
        return this.http.put<Keystroke>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Keystroke>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Keystroke[]>> {
        const options = createRequestOption(req);
        return this.http.get<Keystroke[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Keystroke[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Keystroke = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Keystroke[]>): HttpResponse<Keystroke[]> {
        const jsonResponse: Keystroke[] = res.body;
        const body: Keystroke[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Keystroke.
     */
    private convertItemFromServer(keystroke: Keystroke): Keystroke {
        const copy: Keystroke = Object.assign({}, keystroke);
        return copy;
    }

    /**
     * Convert a Keystroke to a JSON which can be sent to the server.
     */
    private convert(keystroke: Keystroke): Keystroke {
        const copy: Keystroke = Object.assign({}, keystroke);
        return copy;
    }
}
