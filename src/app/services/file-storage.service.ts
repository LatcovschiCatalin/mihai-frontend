import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CustomFileUploadService} from "../modules/admin/shared/custom-file-upload/custom-file-upload.service";

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  constructor(private http: HttpClient, private fileService: CustomFileUploadService) {
  }

  get(paramsObj?: any): Observable<any> {
    const params = new HttpParams({fromObject: paramsObj});
    return this.http.get(`/api/files-storage`, {params});
  }

  getById(id): Observable<any> {
    return this.http.get(`/api/files-storage/${id}`);
  }

  post(file, options?): Observable<any> {
    return this.http.post(
      '/api/files-storage',
      file,
      options
    );
  }

  put(file, id, options?): Observable<any> {
    return this.http.put(
      `/api/files-storage/${id}`,
      file,
      options
    );
  }

  deleteById(id): Observable<any> {
    return this.http.delete<any>(
      `/api/files-storage/${id}`
    );
  }

  fileStorage(gcloud_path, multiple, files, fileSrc) {
    this.get({all: 'true'}).subscribe((res) => {
      let src = gcloud_path;

      let sameFile = res.filter(el => (
        el.src === src
      ))

      let file =
        {
          src: gcloud_path,
          folder: gcloud_path.split('/')[0],
          details: multiple ? files.map(el => (
            {
              name: el['fileName'],
              type: el['type'],
              path: el['fileUrl'],
              active: true,
            }
          )) : [{
            name: files.file.name,
            type: files.file.type,
            path: gcloud_path + files.file.name,
            active: true,
          }]
        }
      if (sameFile.length > 0) {
        if (multiple) {
          let details: object[] = sameFile[0].details;
          for (let i = 0; i < files.length; i++) {
            details = details.filter(el => (
              el['name'] !== files[i]['fileName']
            ))
          }
          sameFile[0].details = [
            ...details,
            ...file.details
          ]
        } else {
          let details: object[] = [];
          details = sameFile[0].details.filter(el => (
            el.name !== files.file['name']
          ))
          sameFile[0].details = [
            ...details,
            ...file.details
          ]
        }
      }
      if (sameFile.length > 0) {
        this.put(sameFile[0], sameFile[0]._id).subscribe()
      } else {
        this.post(file).subscribe()
      }


      if (multiple) {
        for (let i = 0; i < files.length; i++) {
          this.fileService.uploadFile(files[i]['file'], fileSrc).subscribe()
        }
      } else if (files) {
        this.fileService.uploadFile(files.file, fileSrc).subscribe()
      }
    })

  }
}
