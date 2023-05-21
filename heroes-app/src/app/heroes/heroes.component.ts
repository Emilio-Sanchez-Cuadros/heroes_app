import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { delay, lastValueFrom } from 'rxjs';
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
  dataSource: any = new MatTableDataSource<any>([]);
  toasterMessage: string = '';
  searchInput = new FormControl('');
  loaded: boolean = false;

  constructor(
    public matDialog: MatDialog,
    private _heroesService: HeroesService,
    private toaster: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._heroesService.getHeroes()
    .pipe(delay(2000))
      .subscribe(heroes => {
        this.loaded = true;
        this.dataSource.data = heroes;
        console.log('this.dataSource', this.dataSource);
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
          this.dataSource.data = searchList;
          this.dataSource.paginator = this.paginator;
      })
    });

  }

  viewHero(hero: Hero, action: string) {
    if (action === 'view') {
      const indexOfHero = this.dataSource.data.indexOf(hero)
      this.router.navigate(['/heroes/', hero.id]);
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
          const updatedHero = await lastValueFrom(this._heroesService.updateHero(result.hero, result.hero.id));
          const indexOfHero = this.dataSource.data.indexOf(hero);
          this.dataSource.data[indexOfHero] = updatedHero;          
          this.dataSource.paginator = this.paginator;
          this.toasterMessage = 'Hero updated successfully';
          this.toaster.success(this.toasterMessage);
        } catch (error: any) {
          console.log(error.error.code);
          this.toasterMessage = 'Something went wrong, please review the data and try again';
          if (error.error.code === 'P2002') {
            this.toasterMessage = 'This hero already exists';
          }
          this.toaster.error(this.toasterMessage);
        }
      }
    });
  }

  async newHero(action: string) {
    console.log('newHero this.dataSource', this.dataSource);
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {
        action
      },
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result === 'Cancel') {
        return;
      }
      try {
        await lastValueFrom(this._heroesService.createHero(result.hero));
        this._heroesService.getHeroes().subscribe(heroes => {
          this.dataSource.data = heroes;
          this.dataSource.paginator = this.paginator;
        });
        this.toasterMessage = 'Hero created successfully';
        this.toaster.success(this.toasterMessage);
      } catch (error: any) {
        console.log(error.error.code);
        this.toasterMessage = 'Something went wrong, please review the data and try again';
        if (error.error.code === 'P2002') {
          this.toasterMessage = 'This hero already exists';
        }
        this.toaster.error(this.toasterMessage);
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
        await this._heroesService.deleteHero(hero.id).subscribe(res => {
          console.log('hero deleted', res);
          this._heroesService.getHeroes().subscribe(heroes => {
            this.dataSource.data = heroes;
            this.dataSource.paginator = this.paginator;
          });
        });
        this.toasterMessage = 'Hero deleted successfully';
        this.toaster.success(this.toasterMessage);
      } catch (error) {
        console.log(error);
        this.toaster.error('Something went wrong, please try again');
      }
    });
  }

  getHeroesList(heroes: any) {
    return new MatTableDataSource(heroes);
  }

}
