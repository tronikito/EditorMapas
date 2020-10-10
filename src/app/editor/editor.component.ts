import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { EditorMapasService } from './editor-mapas.service';
import { Block } from './block.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  background = "gray";
  blocksWidth: number;
  blocksHeight: number;
  blocksHeightTools: number;
  bwidth: number;
  bheight: number;
  margin: number;

  matrixX: Array<Array<Block>>;
  column: Array<Block>;

  constructor(public serviceEdit: EditorMapasService) {

    this.blocksWidth = this.serviceEdit.blocksWidth;
    this.blocksHeight = this.serviceEdit.blocksHeight;
    this.blocksHeightTools = this.serviceEdit.blocksHeightTools;
    this.bwidth = this.serviceEdit.bwidth;
    this.bheight = this.serviceEdit.bheight;
    this.margin = this.serviceEdit.margin;

    this.matrixX = new Array<Array<Block>>();
    for (var x = 0; x < this.blocksWidth; x++) {
      this.column = new Array<Block>();
      for (var y = 0; y < this.blocksHeight; y++) {
        var b = new Block;
        if (x != 0) {
          b.left = this.matrixX[x - 1][0].left + this.bwidth + this.margin;
        } else {
          b.left = this.margin + 50;
        }
        if (y != 0) {
          b.top = this.column[y - 1].top + this.bheight + this.margin;
        } else {
          b.top = this.margin + 50;
        }
        b.x = x;
        b.y = y;
        b.width = this.bwidth;
        b.height = this.bheight;
        b.type = "block";
        b.position = 0;
        b.enemyType = null;
        b.solid = 0;
        b.weaponType = null;
        b.sprite = 1;
        b.blockType = "empty";

        this.column.push(b);
      }
      this.matrixX.push(this.column)
    }
    this.serviceEdit.matrixX = this.matrixX;
  }

  ngOnInit(): void {
  }

  change(b) {
    b.type = this.serviceEdit.type;
    b.enemyType = this.serviceEdit.enemyType;
    b.weaponType = this.serviceEdit.weaponType;
    b.blockType = this.serviceEdit.blockType;
    b.position = this.serviceEdit.position;
    b.solid = this.serviceEdit.solid;
    b.sprite = this.serviceEdit.sprite;
  }

  getBackGround(b) {
    if (this.matrixX[b.x][b.y].type.localeCompare("enemy") == 0) {
      return "../../assets/" + this.matrixX[b.x][b.y].type + "/" + this.matrixX[b.x][b.y].enemyType + ".png";
    }

    if (this.matrixX[b.x][b.y].type.localeCompare("weapon") == 0) {
      return "../../assets/" + this.matrixX[b.x][b.y].type + "/" + this.matrixX[b.x][b.y].weaponType;
    }

    if (this.matrixX[b.x][b.y].type.localeCompare("block") == 0) {
      if (this.matrixX[b.x][b.y].blockType.localeCompare("empty") == 0) {
        return "../../assets/empty.png";
      } else {
        return "../../assets/" + this.matrixX[b.x][b.y].blockType + "/" + this.matrixX[b.x][b.y].blockType + "_" + this.matrixX[b.x][b.y].sprite + ".png";
      }
    }
  }
}