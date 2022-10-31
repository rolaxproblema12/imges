import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-xyz',
  templateUrl: './xyz.component.html',
  styleUrls: ['./xyz.component.css']
})
export class XyzComponent implements OnInit {
  public previsualization: string = '';
  public archivos: any = [];
  public archi: string[] =[];
  public archi2: any = [];
  imagenes = [];
  
  constructor(private sanitizer:DomSanitizer, private authService:AuthService) { }
  ngOnInit(): void {
    const url = 'http://mi-img.test/api/imagenes';
    this.authService.getImgs(url).subscribe( (Ima:any) =>{
      this.imagenes = Ima;
      console.log(this.imagenes);
    });
  }
  capturarFile(event:any):any{
    console.log(event)

    for (let document of event.target.files)
    {
      this.archi2.push(document);
      console.log(this.archi2)
      this.archi.push(document)
      this.extraerBase64(this.archi.shift()).then((imgen:any) => {
        this.previsualization = imgen.base;
        this.archivos.push(this.previsualization);
        console.log(this.archivos);
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

  subirArchivo():any{
    try{
      const formularioDatos = new FormData();
      this.archi2.forEach((archivo:any) => {
        console.log(archivo);
        formularioDatos.append('img',archivo)
        
      })
      this.authService.postImg('http://mi-img.test/api/imagenes',{'img':'sdfsd'}).subscribe((res:any) =>{
      console.log('la respuesta del servidor es ',res);
      }) 
    }
    catch(e)
    {console.log(e)}
  }
}
