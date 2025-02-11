import { Component, OnInit, ViewChild, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserProfile, UploaderService, wmFile } from '@wizdm/connect';
import { PopupService } from '../../elements/popup';
import { Observable, of } from 'rxjs';
import { filter, take, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'wm-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  host: { 'class': 'wm-page' }
})
export class UploadComponent implements OnInit {

  public uploads: Observable<any[]>;
  public loading: string;

  constructor(private profile: UserProfile, private dialog: MatDialog, private popup: PopupService) {}

  @Input() msgs: any = {};

  // Displays the selection 'none' option
  @Input() none: boolean = true;

  private get uploader(): UploaderService {
    return this.profile.uploads;
  }

  ngOnInit() {

    // Gets the user uploads ob  servable
    this.uploads = this.uploader.stream( ref => ref.orderBy('created') )
      // Resets the uploading progress eventually running when the list updates
      .pipe( tap( () => this.loading = null ));
  }

  public selectedFile: wmFile = {};

  public select(file: wmFile): void {
    this.selectedFile = file;
  }

  public upload(files: FileList): void {

    // Gets the first file
    const file = files.item(0);
    
    // Shows the uploading progress for the selected file
    // it'll be resetted when the uploads list updates
    this.loading = file.name;

    // Uploads t  he file and selects it when done
    this.uploader.uploadOnce(file)
      .then( file => {
        this.selectedFile = file;
      }).catch( () => this.loading = null );
  }

  @ViewChild('dialog', { static: true }) 
  private template : TemplateRef<UploadComponent>;
  private config   : MatDialogConfig = { 
    width: '80vw'//,
    //data: this
  };

  @Output() file = new EventEmitter<wmFile>();

  /**
   * Displays the dialog to select the file among the uploads
   * @param an optional url of the currently selected file, if any 
   * @returns a Promise resolving to the selcted file
   */
  public chooseFile(url?: string): Promise<wmFile> {

    // Starts by getting the already selected file if the url is specified
    return ( url ? this.uploader.streamByUrl(url).pipe( take(1) ) : of<wmFile>({}) )
      .pipe(
        switchMap( file => {
          // Keeps the previous selection
          this.selectedFile = file || {};
          // Shows the dialog for the user to select
          return this.dialog.open(this.template, this.config)
            // Returns an obbservable making sure it completes
            .afterClosed();
        }),
        // Filters unefined values (such as user pressing cancel)
        filter( file => typeof file !== 'undefined' && file !== null),
        // Emits the selection event
        tap( file => { this.file.emit(file); })
        
      ).toPromise();
  }

  public deleteFile(fileId: string) {

    // Ask for confirmation prior to delete the file
    this.popup.confirmPopup(this.msgs.canDelete || { message: 'Please confirm' })
      .subscribe( () => {
        // DEletes the file...
        this.uploader.delete(fileId);
        // ...and select none
        this.selectedFile = {};
      });

  }
}
