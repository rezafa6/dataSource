
import { Injectable } from "@angular/core";

@Injectable()

export class SortService {

   onlyEnabled(data: any) {
    return data.filter(((item: { IsEnabled: boolean; })=> item.IsEnabled == true ))
   }

   onlyDisabled(data: any) {
    return data.filter(((item: { IsEnabled: boolean; })=> item.IsEnabled == false ))
   }

   AZSort(data: any) {
   return data.sort((a: any, b: any) => a.Description.localeCompare(b.Description))
   }

   ZASort(data: any) {
    return data.sort((a: any, b: any) => b.Description.localeCompare(a.Description))
    }

}