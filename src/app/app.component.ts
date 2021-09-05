import { Component } from '@angular/core';
import { ApiClientService, Author } from './api-client.service';

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
