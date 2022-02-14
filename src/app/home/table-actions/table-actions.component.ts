import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DateSourceService } from 'src/app/services/http-service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss'],
  providers: [DateSourceService]
})
export class TableActionsComponent implements OnInit {
  @Output() sendDataToTable = new EventEmitter;
  @Input() editMode = false
  addForm!: FormGroup;
  showError: boolean = false;
  loading: boolean = false;
  enableState: boolean = false
  constructor(
    private dateSourceService: DateSourceService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForms()
  }
  initForms() {
    if(this.editMode) {
      this.addForm = new FormGroup({
        description: new FormControl('', [Validators.required]),
        method: new FormControl('', [Validators.required]),
        route: new FormControl('', [Validators.required]),
        id: new FormControl('', [Validators.required]),
        isEnable: new FormControl(false, [Validators.required]),
      })
    }
    else {
      this.addForm = new FormGroup({
        description: new FormControl('', [Validators.required]),
        method: new FormControl('', [Validators.required]),
        route: new FormControl('', [Validators.required]),
      })
    }
  
  }

  addNewItem() {
    if (this.addForm.invalid) {
      this.showError = true;
      return;
    } else {
      this.loading = true
      let data = {
        'Description': this.addForm.get('description')?.value,
        'Method': this.addForm.get('method')?.value,
        'Route': this.addForm.get('route')?.value
      }
      this.dateSourceService.addNew(data).then(
        res => {
          this.toastrService.success('item successfully added to table');
          this.addNewItemToTable(data);
          this.initForms()
        },
        err => {
          this.toastrService.error('item did not added to the table')
        }
      ).finally(() => {
        this.loading = false;
      })
    }
  }

  addNewItemToTable(data: any) {
    this.sendDataToTable.emit(data)
  }
}
