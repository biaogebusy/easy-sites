import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { PageService } from '../page.service';

import { Page } from '../structureComponents/page';

@Component({
  selector: 'app-pages-list',
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.scss']
})
export class PagesListComponent implements OnInit {
  currentPageId: string;

  constructor(
    public pageService: PageService,
    private router: Router) { }

  ngOnInit() {
    /* This subscription will fire when the route changes */
    this.router.events.subscribe(val=> {
      /* Only react if it's the final active route */
      if (val instanceof NavigationEnd) {
        this.currentPageId = this.getCurrentPageId(val);
      }
    });
  }

  getCurrentPageId(val: NavigationEnd): string {
    // console.log('this.router.url: ', this.router.url);
    /* Holds all params, queryParams, segments and fragments from the current (active) route */
    let currentUrlTree = this.router.parseUrl(this.router.url);
    // console.info(currentUrlTree);
    const group = currentUrlTree.root.children["primary"];
    // console.log('group: ', group);

    if (typeof group == 'undefined') {
      document.addEventListener('pagesFetched', (event) => {
        this.getCurrentPageId(val);
      });
      return null;
    }

    const segments = group.segments; // returns 2 segments 'team' and '33'
    // console.log('segments: ', segments);
    if (segments.length == 2 && segments[0].path == 'page') {
      return segments[1].path;
    }
    // @todo Else throw exception
  }

  addPage(): void {
    this.pageService.addPage();
  }

  removePage(page: Page): void {
    if (page.id == this.currentPageId) {
      this.router.navigate(['page/' + this.pageService.pages[0].id]);
    }
    this.pageService.removePage(page);
  }

  up(page: Page): void {
    let currentPos: number = this.pageService.pages.indexOf(page);
    if (currentPos <= 0) return null;
    this.pageService.pages.splice(currentPos - 1, 0, this.pageService.pages.splice(currentPos, 1)[0]);
  }
  down(page: Page): void {
    let currentPos: number = this.pageService.pages.indexOf(page);
    // No check needed for last section
    this.pageService.pages.splice(currentPos + 1, 0, this.pageService.pages.splice(currentPos, 1)[0]);
  }
}
