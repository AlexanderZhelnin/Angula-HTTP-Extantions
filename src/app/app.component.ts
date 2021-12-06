import { Component } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ApiClientService, Author } from './services/api-client.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  public authors: Author[] = [];


  constructor(public apiClientService: ApiClientService)
  {
    //Date.prototype.toJSON=function(){ return moment(this).format(); }



    for (let i = 0; i < 100; i++)
      apiClientService.GetAllAuthor().subscribe(
        results =>
        {
          this.authors = results;
        },
        error =>
        {
          console.log(error);

        }
      );

    // apiClientService.GetAuthorById(1).subscribe(
    //   results =>
    //   {
    //     this.authors = results;
    //   },
    //   error =>
    //   {

    //   }
    // );



  }
}
