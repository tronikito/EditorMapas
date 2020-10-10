import { Component, OnInit } from '@angular/core';
import { EditorMapasService } from '../editor/editor-mapas.service';
import { BlockTool } from './block-tool.model';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  blocks;
  weapons = null;

  background = "brown";
  blocksWidth: number;
  blocksHeight: number;
  blocksHeightTools:number;
  bwidth: number;
  bheight: number;
  margin: number;
  tools: Array<Array<BlockTool>>;
  column: Array<BlockTool>;

  constructor(public serviceEdit: EditorMapasService) { 

    this.blocksWidth = this.serviceEdit.blocksWidth;
    this.blocksHeight = 2;
    this.blocksHeightTools = this.serviceEdit.blocksHeightTools
    this.bwidth = this.serviceEdit.bwidth;
    this.bheight = this.serviceEdit.bheight;
    this.margin = this.serviceEdit.margin;    

    var toolCount = 0;
    this.tools = new Array<Array<BlockTool>>();
    for (var x = 0; x < this.blocksWidth; x++) {
      this.column = new Array<BlockTool>();
      for (var y = 0; y < this.blocksHeightTools; y++) {
        var b = new BlockTool;
        if (x != 0) {
          b.left = this.tools[x-1][0].left + this.bwidth + this.margin;
        } else {
          b.left = this.margin + 50;
        }
        if (y != 0) {
          b.top = this.column[y-1].top + this.bheight + this.margin;
        } else {
          b.top = this.margin + 50;
        }
        b.tool = toolCount;
        b.width = this.bwidth;
        b.height = this.bheight;
        this.column.push(b);
        toolCount++;
      }
      this.tools.push(this.column);
    }
    this.serviceEdit.tools = this.tools;
  }
  
  ngOnInit(): void {
  }

  options(type,typeSelected,sprite) {

    if (type.localeCompare("enemy") == 0) {
      this.serviceEdit.type = "enemy";
      this.serviceEdit.position = 0;//behind
      this.serviceEdit.solid = 0;
      this.serviceEdit.enemyType = typeSelected;
      this.serviceEdit.weaponType = null;
      this.serviceEdit.blockType = null;
      this.serviceEdit.sprite = sprite;
    }
    if (type.localeCompare("weapon") == 0) {
      this.serviceEdit.type = "weapon";
      this.serviceEdit.position = 0;//behind
      this.serviceEdit.enemyType = null;
      this.serviceEdit.weaponType = typeSelected;
      this.serviceEdit.blockType = null;
      this.serviceEdit.solid = 0;
      this.serviceEdit.sprite = sprite;
    }
    if (type.localeCompare("block") == 0) {
      this.serviceEdit.type = "block";
      this.serviceEdit.position = 0;//behind
      this.serviceEdit.enemyType = null;
      this.serviceEdit.weaponType = null;
      this.serviceEdit.blockType = typeSelected;
      this.serviceEdit.solid = 0;
      this.serviceEdit.sprite = sprite;
    }
  }

  change(b) {

    this.blocks = this.serviceEdit.blocks;
    this.weapons = this.serviceEdit.weapons;
    console.log(this.blocks);

    if (b.tool == 0) {
      this.serviceEdit.position = 0;//b.type
    } else if (b.tool == 1) {
      this.serviceEdit.position = 1;//b.type
    } else if (b.tool == 2) {
      this.serviceEdit.solid = 0;//b.type
    } else if (b.tool == 3) {
      this.serviceEdit.solid = 1;//b.type
    } else if (this.blocks != null && this.weapons != null) {
        if (b.tools > (4+this.weapons.length+this.blocks.length)) {
          this.options("block","empty",1);
        }
    } else {
      if (b.tools > 3) this.options("block","empty",1);
    }
    if (this.weapons != null) {
      if (b.tool >= 4 && b.tool <= this.weapons.length + 4) {
        this.options("weapon",this.weapons[b.tool-4],1);
      }
    }
    if (this.blocks != null && this.weapons != null) {
      if (b.tool >= (4+this.weapons.length) && b.tool <= this.blocks.length + (4+this.weapons.length)) {
        var block = this.blocks[b.tool-(4+this.weapons.length)].split(".",1);
        block = block.toString().split("_",2);
        this.options("block",block[0],block[1]);
      }
    }



  }


  getBackGround(b) {
  
    if (b.tool == 0) {
      return "../../assets/buttom/back.png";
    } else if (b.tool == 1) {
      return "../../assets/buttom/front.png";
    } else if (b.tool == 2) {
      return "../../assets/buttom/nosolid.png";
    } else if (b.tool == 3) {
      return "../../assets/buttom/solid.png";
    }
    if (this.weapons != null) {
      if (b.tool >= 4 && b.tool <= this.weapons.length + 3) {
        return "../../assets/weapon/" + this.weapons[b.tool-4];
      }
      if (this.blocks != null) {
        if (b.tool >= (4+this.weapons.length) && b.tool <= this.blocks.length-1 + (4+this.weapons.length)) {
          
          return "../../assets/" + this.blocks[b.tool-(4+this.weapons.length)].split("_",1) + "/" + this.blocks[b.tool-(4+this.weapons.length)];
        }
        if (b.tool > (4+this.weapons.length+this.blocks.length)) {
          return "../../assets/empty.png";
        }
      }
    }
    if (b.tool > 3) return "../../assets/empty.png";
  }
}
