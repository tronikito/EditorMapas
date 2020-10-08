import { Component, OnInit, ViewChild } from '@angular/core';
import { EditorMapasService } from '../editor/editor-mapas.service';
import { Tools } from './tools.model';
import { Block } from '../editor/block.model';

@Component({
  selector: 'app-file-tools',
  templateUrl: './file-tools.component.html',
  styleUrls: ['./file-tools.component.css']
})
export class FileToolsComponent implements OnInit {

  background = "red";

  blocksWidth: number;
  blocksHeight: number;
  blocksHeightTools: number;
  margin: number;
  fileToolsWidth: String;
  toolsNumber: number;
  bwidth: number;
  bheight: number;
  fileTools: Array<Tools>;
  serviceEdit: EditorMapasService;
  pathLoad: any;
  pathSave: any;

  constructor(public EditorMapasService: EditorMapasService) {

    this.serviceEdit = EditorMapasService;
    this.blocksWidth = this.serviceEdit.blocksWidth;
    this.blocksHeight = this.serviceEdit.blocksHeight;
    this.blocksHeightTools = this.serviceEdit.blocksHeightTools;
    this.margin = this.serviceEdit.margin;
    this.fileToolsWidth = this.serviceEdit.fileToolsWidth;
    this.toolsNumber = this.serviceEdit.toolsNumber;
    this.bwidth = this.serviceEdit.bwidth;
    this.bheight = this.serviceEdit.bheight;
    this.fileTools = this.serviceEdit.fileTools;
    this.fileTools = new Array<Tools>();

    for (var x = 0; x < 4; x++) {
      var t = new Tools();
      if (x == 0) {
        t.top = 50 + this.bheight*1.5;
        t.left = 50 + this.margin + this.bwidth ;
        t.width = (this.margin + this.bwidth)*3;
        t.height = this.margin + this.bheight;
        t.toolOption = "addRow";
        this.fileTools.push(t);
      }
      if (x == 1) {
        t.top = this.bheight*1.5;
        t.left = (this.bwidth)*6;
        t.width = this.margin + this.bheight;
        t.height = (this.margin + this.bheight)*2;
        t.toolOption = "addCol";
        this.fileTools.push(t);
      }
      if ( x == 2) {
        t.top = this.bheight;
        t.left = 50 + this.margin + this.bwidth ;
        t.width = (this.margin + this.bwidth)*3;
        t.height = this.margin + this.bheight;
        t.toolOption = "delRow";
        this.fileTools.push(t);
      }
      if (x == 3) {
        t.top = this.bheight*1.5;
        t.left = (this.margin + this.bwidth);
        t.width = this.margin + this.bheight;
        t.height = (this.margin + this.bheight)*2;
        t.toolOption = "delCol";
        this.fileTools.push(t);
      }
    }
  }

  ngOnInit(): void {
  }

  change(b) {
    if (b.toolOption.localeCompare("addRow") == 0) {
      
      for (var x = 0; x < this.serviceEdit.blocksWidth; x++) {
        var c = new Block;
        if (this.serviceEdit.blocksWidth-1 > 0) {
          c.left = this.serviceEdit.matrixX[x][0].left;
        } else {
          c.left = this.margin + 50;
        }
        if (this.serviceEdit.blocksHeight > 0) {
          c.top = this.serviceEdit.matrixX[x][this.serviceEdit.blocksHeight-1].top + this.bheight + this.margin;
        } else {
          c.top = this.margin + 50;
        }
        c.x = x;
        c.y = this.serviceEdit.blocksHeight;
        c.width = this.bwidth;
        c.height = this.bheight;
        c.type = "block";// OPTIONS OF BLOCK ON ADD ROW
        c.position = 0;
        c.enemyType = null;
        c.solid = 0;
        c.weaponType = null;
        c.sprite = 1;
        c.blockType = "empty";
        this.serviceEdit.matrixX[x].push(c);
      }
      this.serviceEdit.blocksHeight++;


    } else if (b.toolOption.localeCompare("addCol") == 0) {

        var column = new Array<Block>();
        for (var y = 0; y < this.serviceEdit.blocksHeight; y++) {
          var c = new Block;
          if (this.serviceEdit.blocksWidth-1 > 0) {
            c.left = this.serviceEdit.matrixX[this.serviceEdit.matrixX.length-1][0].left + this.bwidth + this.margin;
          } else {
            c.left = this.margin + 50;
          }
          if (y > 0) {
            c.top = column[y-1].top + this.bheight + this.margin;
          } else {
            c.top = this.margin + 50;
          }
          c.x = this.serviceEdit.blocksWidth;
          c.y = y;
          c.width = this.bwidth;
          c.height = this.bheight;
          c.type = "block";// OPTIONS OF BLOCK ON ADD COL
          c.position = 0;
          c.enemyType = null;
          c.solid = 0;
          c.weaponType = null;
          c.sprite = 1;
          c.blockType = "empty";
          column.push(c);
        }
        this.serviceEdit.matrixX.push(column);
        this.serviceEdit.blocksWidth++;

    } else if (b.toolOption.localeCompare("delRow") == 0) {

      for (var x = 0; x < this.serviceEdit.blocksWidth; x++) {
        this.serviceEdit.matrixX[x].splice(this.serviceEdit.blocksHeight-1,1);
      }
      this.serviceEdit.blocksHeight--;

    } else if (b.toolOption.localeCompare("delCol") == 0) {

      this.serviceEdit.blocksWidth--;
      this.serviceEdit.matrixX.splice(this.serviceEdit.matrixX.length-1,1);
      
    }
  }

  getBackGround(b) {
    if (b.toolOption.localeCompare("addRow") == 0) {
      return "../../assets/buttom/add.png";
    } else if (b.toolOption.localeCompare("addCol") == 0) {
      return "../../assets/buttom/add.png";
    } else if (b.toolOption.localeCompare("delRow") == 0) {
      return "../../assets/buttom/del.png";
    } else if (b.toolOption.localeCompare("delCol") == 0) {
      return "../../assets/buttom/del.png";
    }
  }
  /*loadPath(path) {
    this.pathLoad = "C:/Users/kvn/Descargas/" + path.target.files[0].name;
}*/
  load() {
    var newMatrixX = require("../../maps/old.json");
    var diferenceWidth = newMatrixX.length - this.serviceEdit.matrixX.length;

      var tool = new Tools();
      if (diferenceWidth < 0) {
        tool.toolOption = "delCol";
        diferenceWidth =  this.serviceEdit.matrixX.length - newMatrixX.length;
        for (var j = 0; j < diferenceWidth; j++) {
          this.change(tool);
        }
      } else {
        tool.toolOption = "addCol";
        for (var j = 0; j < diferenceWidth; j++) {
          this.change(tool);
        }
      }

    var diferenceHeight = newMatrixX[0].length - this.serviceEdit.matrixX[0].length;
    if (diferenceHeight < 0) {
      diferenceHeight = this.serviceEdit.matrixX[0].length - newMatrixX[0].length;
      tool.toolOption = "delRow";
      for (var j = 0; j < diferenceHeight; j++) {
        this.change(tool);
      }
    } else {
      tool.toolOption = "addRow";
      for (var j = 0; j < diferenceHeight; j++) {
        this.change(tool);
      }
    }


    for (var x = 0; x < this.serviceEdit.matrixX.length; x++) {
      for (var y = 0; y < this.serviceEdit.matrixX[0].length; y++) {
        this.serviceEdit.matrixX[x][y].type = newMatrixX[x][y].type;
        this.serviceEdit.matrixX[x][y].position = newMatrixX[x][y].position;
        this.serviceEdit.matrixX[x][y].enemyType = newMatrixX[x][y].enemyType;
        this.serviceEdit.matrixX[x][y].solid = newMatrixX[x][y].solid;
        this.serviceEdit.matrixX[x][y].weaponType = newMatrixX[x][y].weaponType;
        this.serviceEdit.matrixX[x][y].sprite = newMatrixX[x][y].sprite;
        this.serviceEdit.matrixX[x][y].blockType = newMatrixX[x][y].blockType;
      }
    }
  }/*
  savePath(path) {
    this.pathSave = path.target.files[0].name;
  }*/
  save() {
    this.generateJSON();
  }
  
  generateJSON() {
    //JSON.stringify(this.serviceEdit.matrixX);
    var matriXXFile = new Array();
    for (var x = 0; x < this.serviceEdit.matrixX.length; x++) {
      var columnFile = new Array();
      for (var y = 0; y < this.serviceEdit.matrixX[x].length; y++) {
        var block = new Block();
        block.type = (this.serviceEdit.matrixX[x][y].type);
        block.position = (this.serviceEdit.matrixX[x][y].position);
        block.enemyType = (this.serviceEdit.matrixX[x][y].enemyType);
        block.solid = (this.serviceEdit.matrixX[x][y].solid);
        block.weaponType = (this.serviceEdit.matrixX[x][y].weaponType);
        block.sprite = (this.serviceEdit.matrixX[x][y].sprite);
        block.blockType = (this.serviceEdit.matrixX[x][y].blockType);

        columnFile.push(block);
      }
      matriXXFile.push(columnFile);
    }
    this.makeFile(JSON.stringify(matriXXFile),null);
  }

  makeFile(data, filename) {
      if(!data) {
          console.error('No data')
          return;
      }
  
      if(!filename) filename = 'console.json'
  
      if(typeof data === "object"){
          data = JSON.stringify(data, undefined, 4)
      }
  
      var blob = new Blob([data], {type: 'text/json'}),
          e    = document.createEvent('MouseEvents'),
          a    = document.createElement('a')
  
      a.download = filename
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
      e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
  }
}
