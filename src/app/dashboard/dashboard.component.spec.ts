import { render, RenderResult } from '@testing-library/angular';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';
import { HEROES } from '../mock-heroes';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: RenderResult<DashboardComponent, DashboardComponent>;
  let heroService;
  let getHeroesSpy;

  beforeEach(async () => {
    heroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    getHeroesSpy = heroService.getHeroes.and.returnValue(of(HEROES));
    component = await render(DashboardComponent, {
      providers: [{ provide: HeroService, useValue: heroService }],
    });
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top Heroes" as headline', () => {
    // h2の中のテキストを取得
    // 取得できなければ例外が発生するので、expectしなくてよい
    component.getByText('Top Heroes', { selector: 'h2' });
  });

  it('should call heroService', () => {
    expect(getHeroesSpy.calls.any()).toBe(true);
  });

  it('should display 4 links', () => {
    expect(component.queryAllByText(/./, { selector: 'a' }).length).toEqual(4);
  });
});
