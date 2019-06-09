import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PageService } from './page.service';

import { Page } from './structureComponents/page';

@Component({
  selector: 'app-home',
  template: '<h1>Loading&hellip;</h1>',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public pageService: PageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // When the pages are first fetched
    document.addEventListener('pagesFetched', (event) => {
      // If there are saved pages
      if (this.pageService.pages.length) {
        this.pageService.navigateToFirstPage();
      }
      else {
        this.showBlankPage();
      }
    }, false);
  }

  showBlankPage() {
    // Show a blank page ready for adding text
    var page: Page = this.pageService.addPage();
    this.router.navigate(['page/' + page.id]);
    var request = this.pageService.savePage(page, 'post');
  }
}
