import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IKeystroke } from 'app/shared/model/keystroke.model';

export type EntityResponseType = HttpResponse<IKeystroke>;
export type EntityArrayResponseType = HttpResponse<IKeystroke[]>;

@Injectable()
export class KeystrokeService {
    private resourceUrl = SERVER_API_URL + 'api/keystrokes';

    constructor(private http: HttpClient) {}

    create(keystroke: IKeystroke): Observable<EntityResponseType> {
        const copy = this.convert(keystroke);
        return this.http
            .post<IKeystroke>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(keystroke: IKeystroke): Observable<EntityResponseType> {
        const copy = this.convert(keystroke);
        return this.http
            .put<IKeystroke>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IKeystroke>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IKeystroke[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IKeystroke = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
        const jsonResponse: IKeystroke[] = res.body;
        const body: IKeystroke[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Keystroke.
     */
    private convertItemFromServer(keystroke: IKeystroke): IKeystroke {
        const copy: IKeystroke = Object.assign({}, keystroke, {});
        return copy;
    }

    /**
     * Convert a Keystroke to a JSON which can be sent to the server.
     */
    private convert(keystroke: IKeystroke): IKeystroke {
        const copy: IKeystroke = Object.assign({}, keystroke, {});
        return copy;
    }
}
