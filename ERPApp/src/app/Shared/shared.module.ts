import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadFileComponent } from '../Components/note-list/download-file/download-file.component';
import { FilesizePipe } from '../Pipes/filesize.pipe';

@NgModule({
  declarations: [
    DownloadFileComponent,
    FilesizePipe
  ],
  exports: [
    DownloadFileComponent,
    FilesizePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
