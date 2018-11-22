import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PostArchiveComponent } from './post-archive/post-archive.component';
import { MatchesListComponent } from './matches-list/matches-list.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { EnglishComponent } from './english/english.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'detail/:id', component: PostDetailComponent },
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'newsarchive', component: PostArchiveComponent },
  { path: 'matches', component: MatchesListComponent },
  { path: 'sponsors', component: SponsorsComponent },
  { path: 'english', component: EnglishComponent },
  { path: 'teams', component: TeamsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
