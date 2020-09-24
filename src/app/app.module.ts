import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { ToolsComponent } from './tools/tools.component';
import { FileToolsComponent } from './file-tools/file-tools.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    ToolsComponent,
    FileToolsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
