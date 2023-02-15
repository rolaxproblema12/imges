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
  public archi2: any= [];
  public imagenes:any = [];
  public images : any = [];
  
  constructor(private sanitizer:DomSanitizer, private authService:AuthService) { }
  ngOnInit(): void {
    const url = 'http://mi-img.test/api/imagenes';
    this.authService.getImgs(url).subscribe( (Ima:any) =>{
      this.imagenes.push(Ima)
      console.log(this.imagenes)
      console.log(this.imagenes.length)
      for(let img of this.imagenes)
      {
        for(let imgg of img)
        {
          let result = imgg.img.replace('public/','http://mi-img.test/storage/');
          console.log(result)
          this.images.push(result)
        }
      }
      // for(let i = 0; i<this.imagenes.length; i++)
      // {
      //   // let htpp = 'http://mi-img.test/storage/'+img.img;
      //   // console.log(htpp+'hello');

      //   if(i==3)
      //   {
      //     console.log("hellos qword")
      //   }
      //     console.log(this.imagenes[i]) 
      //   // this.images.push();
      //   console.log(i)
      // }
      

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
        this.authService.postImg('http://mi-img.test/api/imagenes',formularioDatos).subscribe((res:any) =>{
          console.log('la respuesta del servidor es ',res);
          }) 
      })

    }
    catch(e)
    {console.log(e)}
  }
}
