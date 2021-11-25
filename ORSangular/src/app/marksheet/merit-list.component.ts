import { Component, OnInit } from "@angular/core";
import { EndpointServiceService } from "../endpoint-service.service";
import { HttpServiceService } from "../http-service.service";
import { ServiceLocatorService } from "../service-locator.service";

@Component({
    selector: 'app-merit-list',
    templateUrl: 'merit-list.component.html',
})
export class MeritListComponent implements OnInit {
    

    constructor(private httpService: HttpServiceService, private endpoint: EndpointServiceService,private serviceLocator: ServiceLocatorService) {

    }

    public form = {
        list: [],
        error: false,
        pageNo: 0,
        pageSize: 10,
        count: 0
    }

    ngOnInit() {
        this.meritList();
    }
    result(physics, maths, chemistry) {
        if ((physics + maths + chemistry) / 3 >= 35.0 && physics >= 35 && maths >= 35 && chemistry >= 35) {
            return true;
        } else {
            return false;
        }
    }
    forward(page){
        this.serviceLocator.forward(page);
      }
    
    meritList() {
        var _self = this;
        _self.httpService.get(_self.endpoint.MARKSHEET + "/meritList", function (res) {
            if (res.success) {
                _self.form.error = false;
                _self.form.list = res.result.list;
                _self.form.pageNo = res.result.pageNo;
                _self.form.pageSize = res.result.pageSize;
                _self.form.count = res.result.count;
    
            }
            else {
                _self.form.error = true
            }
        })
    }
}