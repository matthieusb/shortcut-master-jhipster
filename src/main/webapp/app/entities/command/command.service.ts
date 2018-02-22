import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Command } from './command.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Command>;

@Injectable()
export class CommandService {

    private resourceUrl =  SERVER_API_URL + 'api/commands';

    constructor(private http: HttpClient) { }

    create(command: Command): Observable<EntityResponseType> {
        const copy = this.convert(command);
        return this.http.post<Command>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(command: Command): Observable<EntityResponseType> {
        const copy = this.convert(command);
        return this.http.put<Command>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Command>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Command[]>> {
        const options = createRequestOption(req);
        return this.http.get<Command[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Command[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Command = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Command[]>): HttpResponse<Command[]> {
        const jsonResponse: Command[] = res.body;
        const body: Command[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Command.
     */
    private convertItemFromServer(command: Command): Command {
        const copy: Command = Object.assign({}, command);
        return copy;
    }

    /**
     * Convert a Command to a JSON which can be sent to the server.
     */
    private convert(command: Command): Command {
        const copy: Command = Object.assign({}, command);
        return copy;
    }
}
