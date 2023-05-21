import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { Hero } from '../models/models'
import { DialogComponent } from '../shared/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { HeroesService } from '../services/heroes.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;    

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource: any;
  toasterMessage: string = '';
  searchInput = new FormControl('');
  loaded: boolean = true;

  constructor(
    public matDialog: MatDialog,
    private _heroesService: HeroesService,
    private toaster: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    lastValueFrom(this._heroesService.getHeroes())
      .then(heroes => {
        this.dataSource = this.getHeroesList(heroes);
        this.dataSource.paginator = this.paginator;   
    });

    this.searchInput.valueChanges
    .pipe(
      debounceTime(300),
    )
    .subscribe(searchText => {
      console.log('searchInput.subscribe() searchText:', searchText);
      this._heroesService.getHeroByName(searchText)
        .subscribe(searchList => {
          console.log('searchInput.subscribe() searchText', searchList);
          this.dataSource = this.getHeroesList(searchList);
          this.dataSource.paginator = this.paginator;
      })
    });

  }

  viewHero(hero: Hero, action: string) {
    if (action === 'view') {
      const indexOfHero = this.dataSource.data.indexOf(hero)
      this.router.navigate(['/heroes/', indexOfHero]);
      return;
    }
    console.log('viewHero()', hero);
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {
        hero,
        action
      },
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result?.hero) {
        try {
          console.log('The dialog was closed: ', result);
          let updatedList;
          if (result.action === 'add') {
            updatedList = await lastValueFrom(this._heroesService.createHero(result.hero));
            this.dataSource = updatedList;
            this.toasterMessage = 'Hero created successfully';
          } else if (result.action === 'edit') {
            const updatedHero = await lastValueFrom(this._heroesService.updateHero(result.hero, result.hero.id));
            /* Methods with mocked data from json */
            // const indexOfHero = this.dataSource.data.indexOf(hero);
            // this.dataSource.data[indexOfHero] = updatedHero;
            
            /* Code for using BE */
            this.dataSource = this._heroesService.getHeroes();

            this.toasterMessage = 'Hero updated successfully';
          }
          this.dataSource.paginator = this.paginator;
          this.toaster.success(this.toasterMessage);
        } catch (error: any) {
          console.log(error);
          this.toaster.error('Something went wrong, please review the data and try again');
        }
      }
    });
  }

  async newHero(action: string) {
    console.log('newHero this.dataSource', this.dataSource);
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {
        action,
        idToNewUser: Date.now()
      },
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result === 'Cancel') {
        return;
      }
      try {
        await lastValueFrom(this._heroesService.createHero(result.hero));
        this.dataSource = this._heroesService.getHeroes();
        this.dataSource.paginator = this.paginator;
        this.toasterMessage = 'Hero created successfully';
        this.toaster.success(this.toasterMessage);
      } catch (error) {
        console.log(error);
        this.toaster.error('Something went wrong, please try again');
      }
    });

  }

  async deleteHero(hero: any, action: string) {
    console.log('deleteHero()', hero);
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {
        action,
        heroName: hero.name
      },
    });
    dialogRef.afterClosed().subscribe(async result => {
      console.log('deleteHero result: ', result);
      if (result === 'Cancel') {
        return;
      }
      try {
        // const indexOfHero = this.dataSource.data.indexOf(hero);
        // const updatedList = await lastValueFrom(this._heroesService.deleteHero(indexOfHero));
        const updatedList = await lastValueFrom(this._heroesService.deleteHero(hero.id));
        // this.dataSource = this.getHeroesList(updatedList);
        this.dataSource = this._heroesService.getHeroes();
        this.dataSource.paginator = this.paginator;
        this.toasterMessage = 'Hero deleted successfully';
        this.toaster.success(this.toasterMessage);
      } catch (error) {
        console.log(error);
        this.toaster.error('Something went wrong, please try again');
      }
    });
  }

  getHeroesList(heroes: Hero[]) {
    return new MatTableDataSource(heroes);
  }

}
