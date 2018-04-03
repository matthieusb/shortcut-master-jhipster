import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICommand } from 'app/shared/model/command.model';

export type EntityResponseType = HttpResponse<ICommand>;
export type EntityArrayResponseType = HttpResponse<ICommand[]>;

@Injectable()
export class CommandService {
    private resourceUrl = SERVER_API_URL + 'api/commands';

    constructor(private http: HttpClient) {}

    create(command: ICommand): Observable<EntityResponseType> {
        const copy = this.convert(command);
        return this.http
            .post<ICommand>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(command: ICommand): Observable<EntityResponseType> {
        const copy = this.convert(command);
        return this.http
            .put<ICommand>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICommand>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICommand[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ICommand = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: EntityArrayResponseType): EntityArrayResponseType {
        const jsonResponse: ICommand[] = res.body;
        const body: ICommand[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Command.
     */
    private convertItemFromServer(command: ICommand): ICommand {
        const copy: ICommand = Object.assign({}, command, {});
        return copy;
    }

    /**
     * Convert a Command to a JSON which can be sent to the server.
     */
    private convert(command: ICommand): ICommand {
        const copy: ICommand = Object.assign({}, command, {});
        return copy;
    }
}
