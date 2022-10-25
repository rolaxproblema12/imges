import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';

@Component({
  selector: 'app-xyz',
  templateUrl: './xyz.component.html',
  styleUrls: ['./xyz.component.css']
})
export class XyzComponent implements OnInit {
  public previsualization: string = '';
  public archivos: any = [];
  public archi: string[] =[];

  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
  }
  capturarFile(event:any):any{
    console.log(event)
    for (let document of event.target.files)
    {
      this.archi.push(document)
      this.extraerBase64(this.archi.shift()).then((imgen:any) => {
        this.previsualization = imgen.base;
        this.archivos.push(this.previsualization);
      });

    } 


  }
  extraerBase64 = async ($event : any) => new Promise((resolve, reject) => 
  {
    try
    {
      const unasefImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unasefImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({

          base: reader.result
        });
      };
      reader.onerror = error =>{
        resolve({
          base: null
        });
      }
    }catch(e){
    }
      
  })

  // subirArchivo():any{
  //   try{
  //     const formularioDatos = new FormData();
  //     this.archivos.forEach((archivo:any) => {
  //       console.log(archivo); 
  //       formularioDatos.append('files',archivo)
  //     })
  //     this.rest.post('https:',formularioDatos).subscribe((res:any) =>{
  //       console.log('la respuesta del servidor es ',res);
  //     }) 
  //   }
  //   catch(e)
  //   {console.log(e)}
  // }
}
