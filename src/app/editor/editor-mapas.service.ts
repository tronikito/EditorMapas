
import { BlockTool } from '../tools/block-tool.model';
import { Block } from '../editor/block.model';
import { Tools } from '../file-tools/tools.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditorMapasService {

  public images;

  public blocksWidth = 32-1; //because 0
  public blocksHeight = 18-1; // because 0
  public blocksHeightTools = 2;
  public toolsNumber = 4;
  public fileToolsWidth = "600px";
  public bwidth = 35;
  public bheight = 35;
  public margin = 2;
  public tools: Array<Array<BlockTool>>;
  public matrixX: Array<Array<Block>>;
  public fileTools: Array<Tools>;

  public type = "block";
  public position = 0;//behind
  public solid = 0;
  public enemyType = null;
  public weaponType = null;
  public blockType = "empty";
  public sprite = 1;
  
  constructor(private http: HttpClient) {

    this.callForImages();
    
   }

  callForImages() {
    this.http.get("http://localhost:8080/images")
      .subscribe(data => {
        this.images = data;
        console.log(this.images);
      });
  }
}
