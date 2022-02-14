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

    addNew(data: any) {
        return new Promise((resolve , reject) => {
            this.http.post(this.baseURL , data).subscribe(
                res => {resolve(res)},
                err => {reject(err)}
            )
        })
    }

    deleteItem(data: any) {
        return new Promise((resolve , reject) => {
            this.http.delete(this.baseURL , data).subscribe(
                res => {resolve(res)},
                err => {reject(err)}
            )
        })
    }

    edit() {

    }
}