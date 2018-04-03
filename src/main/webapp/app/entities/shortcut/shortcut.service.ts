import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IShortcut } from 'app/shared/model/shortcut.model';

export type EntityResponseType = HttpResponse<IShortcut>;
export type EntityArrayResponseType = HttpResponse<IShortcut[]>;

@Injectable()
export class ShortcutService {
    private resourceUrl = SERVER_API_URL + 'api/shortcuts';

    constructor(private http: HttpClient) {}

    create(shortcut: IShortcut): Observable<EntityResponseType> {
        const copy = this.convert(shortcut);
        return this.http
            .post<IShortcut>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(shortcut: IShortcut): Observable<EntityResponseType> {
        const copy = this.convert(shortcut);
        return this.http
            .put<IShortcut>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IShortcut>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IShortcut[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IShortcut = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
        const jsonResponse: IShortcut[] = res.body;
        const body: IShortcut[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Shortcut.
     */
    private convertItemFromServer(shortcut: IShortcut): IShortcut {
        const copy: IShortcut = Object.assign({}, shortcut, {});
        return copy;
    }

    /**
     * Convert a Shortcut to a JSON which can be sent to the server.
     */
    private convert(shortcut: IShortcut): IShortcut {
        const copy: IShortcut = Object.assign({}, shortcut, {});
        return copy;
    }
}
