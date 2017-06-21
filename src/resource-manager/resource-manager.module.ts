import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  TreeTableModule,
  SharedModule,
  PanelModule,
  ButtonModule,
  DialogModule,
  TooltipModule,
  SelectButtonModule
} from 'primeng/primeng';

import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { ResourceManagerService } from './resource-manager.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    TreeTableModule,
    SharedModule,
    PanelModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
    SelectButtonModule
  ],
  declarations: [
    ListComponent,
    FormComponent
  ],
  providers: [ResourceManagerService]
})
export class ResourceManagerModule { }
