import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
// tslint:disable-next-line:max-line-length
import { MatSidenavModule, MatDialogModule, MatCardModule, MatMenuModule, MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatProgressSpinnerModule, MatExpansionModule, MatFormFieldModule } from '@angular/material';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { FacebookModule } from 'ngx-facebook';
import { AgmCoreModule } from '@agm/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HomeComponent } from './home/home.component';
import { environment } from '../environments/environment.prod';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AboutComponent } from './about/about.component';
import { FacebookPagePluginComponent } from './facebook-page-plugin/facebook-page-plugin.component';
import { MapComponent } from './map/map.component';
import { ContactComponent } from './contact/contact.component';
import { PostArchiveComponent } from './post-archive/post-archive.component';
import { MatchesComponent } from './matches/matches.component';

import { registerLocaleData } from '@angular/common';
import localeDa from '@angular/common/locales/da';
import localeDaExtra from '@angular/common/locales/extra/da';
import { MatchesListComponent } from './matches-list/matches-list.component';
import { ActivitiesComponent } from './activities/activities.component';
import { LocationComponent } from './location/location.component';
import { TrainingComponent } from './training/training.component';
import { InstagramComponent } from './instagram/instagram.component';
import { VisionComponent } from './vision/vision.component';
import { PartiesComponent } from './parties/parties.component';
import { FooterComponent } from './footer/footer.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { EnglishComponent } from './english/english.component';
import { TeamsComponent } from './teams/teams.component';
import { ContactFooterComponent } from './contact-footer/contact-footer.component';
import { StartGuideComponent } from './start-guide/start-guide.component';
import { PoliticsComponent } from './politics/politics.component';
import { WorkComponent } from './work/work.component';
import { EventDetailsComponent } from './event-details/event-details.component';

registerLocaleData(localeDa, 'da-DA', localeDaExtra);


export function markedOptions(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.blockquote = (text: string) => {
    return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
  };

  return {
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostListComponent,
    PostDetailComponent,
    NavBarComponent,
    AboutComponent,
    FacebookPagePluginComponent,
    MapComponent,
    ContactComponent,
    PostArchiveComponent,
    MatchesComponent,
    MatchesListComponent,
    ActivitiesComponent,
    LocationComponent,
    TrainingComponent,
    InstagramComponent,
    VisionComponent,
    PartiesComponent,
    FooterComponent,
    SponsorsComponent,
    EnglishComponent,
    TeamsComponent,
    ContactFooterComponent,
    StartGuideComponent,
    PoliticsComponent,
    WorkComponent,
    EventDetailsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'JAI'}),
    BrowserAnimationsModule,
    AppRoutingModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MatCardModule,
    MatMenuModule,
    MatSidenavModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatFormFieldModule,
    SlickCarouselModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptions,
      }
    }),
    FacebookModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.maps.apiKey
    }),
    FlexLayoutModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'da-DA' } ],
  bootstrap: [AppComponent],
  entryComponents: [FacebookPagePluginComponent, PostDetailComponent, EventDetailsComponent]
})
export class AppModule { }
