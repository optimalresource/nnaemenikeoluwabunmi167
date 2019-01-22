import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  readFile(file, reader) {
    reader.onload = () => {
      console.log('reader.result', reader.result);
      let base64ToString = `${reader.result}`
      return base64ToString;
    }
    reader.readAsDataURL(file);
  }
}
