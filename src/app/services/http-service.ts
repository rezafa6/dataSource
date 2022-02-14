import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
environment
@Injectable()

export class DateSourceService {
    constructor(private http: HttpClient) {}
    baseURL : string = environment.baseURL
    getData() {
        return new Promise((resolve , reject) => {
            this.http.get(this.baseURL).subscribe(
                res => {resolve(res)},
                err => {reject(err)}
            )
        })
    }

    addNew() {

    }

    delete() {

    }

    edit() {

    }
}