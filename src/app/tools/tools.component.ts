import { Component, OnInit } from '@angular/core';
import { EditorMapasService } from '../editor/editor-mapas.service';
import { BlockTool } from './block-tool.model';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  background = "brown";
  blocksWidth: number;
  blocksHeight: number;
  blocksHeightTools:number;
  bwidth: number;
  bheight: number;
  margin: number;
  serviceEdit: EditorMapasService;
  tools: Array<Array<BlockTool>>;
  column: Array<BlockTool>;

  constructor(public EditorMapasService: EditorMapasService) { 

    this.serviceEdit = EditorMapasService;
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
      console.log("enemy");
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
    if (b.tool == 2) {
      this.serviceEdit.position = 0;//b.type
    } else if (b.tool == 3) {
      this.serviceEdit.position = 1;//b.type
    } else if (b.tool == 4) {
      this.serviceEdit.solid = 0;//b.type
    } else if (b.tool == 5) {
      this.serviceEdit.solid = 1;//b.type
    } else if (b.tool == 6) {
      this.options("enemy","spider",1);//spider
    } else if (b.tool == 7) {
      this.options("enemy","plant",1);//plant
    } else if (b.tool == 8) {
      this.options("weapon","chicken",1);//chicken
    } else if (b.tool == 9) {
      this.options("weapon","ferret",1);//ferret
    } else if (b.tool == 10) {
      this.options("weapon","unicorn",1);//unicorn
    } else if (b.tool == 11) {
      this.options("block","grass",0);//grass animated
    } else if (b.tool == 12) {
      this.options("block","dirt",1);//dirt1
    } else if (b.tool == 13) {
      this.options("block","dirt",2);//dirt2
    } else if (b.tool == 14) {
      this.options("block","stone",1);//stone1
    } else if (b.tool == 15) {
      this.options("block","stone",2);//stone2
    } else if (b.tool == 16) {
      this.options("block","void",0);//void animated
    } else if (b.tool == 17) {
      this.options("block","sapphire",1);//void animated
    } else if (b.tool == 18) {
      this.options("block","sapphire",2);//void animated
    } else if (b.tool == 19) {
      this.options("block","sapphire",3);//void animated
    } else if (b.tool == 20) {
      this.options("block","gold",1);//void animated
    } else if (b.tool == 21) {
      this.options("block","gold",2);//void animated
    } else if (b.tool == 22) {
      this.options("block","gold",3);//void animated
    } else if (b.tool == 23) {
      this.options("block","redstone",1);//void animated
    } else if (b.tool == 24) {
      this.options("block","redstone",2);//void animated
    } else if (b.tool == 25) {
      this.options("block","redstone",3);//void animated
    } else if (b.tool == 26) {
      this.options("block","dirtup",1);//void animated
    } else if (b.tool == 27) {
      this.options("block","stoneup",1);//void animated
    } else if (b.tool == 28) {
      this.options("block","stone",3);//void animated
    } else if (b.tool == 29) {
      this.options("block","stoneAngle",1);//void animated
    } else if (b.tool == 30) {
      this.options("block","stoneAngle",2);//void animated
    } else if (b.tool == 31) {
      this.options("block","stoneAngle",3);//void animated
    } else if (b.tool == 32) {
      this.options("block","stoneAngle",4);//void animated
    } else {
      this.options("block","empty",1);//void animated
    }
  }


  getBackGround(b) {

  
    if (b.tool == 0) {
      return "../../assets/back.png";
    } else if (b.tool == 1) {
      return "../../assets/front.png";
    } else if (b.tool == 2) {
      return "../../assets/nosolid.png";
    } else if (b.tool == 3) {
      return "../../assets/solid.png";
    } //fixed
    
    
    else if (b.tool == 6) {
      return "../../assets/spider.png";
    } else if (b.tool == 7) {
      return "../../assets/plant.png";
    } else if (b.tool == 8) {
      return "../../assets/chicken.png";
    } else if (b.tool == 9) {
      return "../../assets/ferret.png";
    } else if (b.tool == 10) {
      return "../../assets/unicorn.png";
    } else if (b.tool == 11) {
      return "../../assets/grass_0.png";
    } else if (b.tool == 12) {
      return "../../assets/dirt_1.png";
    } else if (b.tool == 13) {
      return "../../assets/dirt_2.png";
    } else if (b.tool == 14) {
      return "../../assets/stone_1.png";
    } else if (b.tool == 15) {
      return "../../assets/stone_2.png";
    } else if (b.tool == 16) {
      return "../../assets/void_0.png";
    } else if (b.tool == 17) {
      return "../../assets/sapphire_1.png";
    } else if (b.tool == 18) {
      return "../../assets/sapphire_2.png";
    } else if (b.tool == 19) {
      return "../../assets/sapphire_3.png";
    } else if (b.tool == 20) {
      return "../../assets/gold_1.png";
    } else if (b.tool == 21) {
      return "../../assets/gold_2.png";
    } else if (b.tool == 22) {
      return "../../assets/gold_3.png";
    } else if (b.tool == 23) {
      return "../../assets/redstone_1.png";
    } else if (b.tool == 24) {
      return "../../assets/redstone_2.png";
    } else if (b.tool == 25) {
      return "../../assets/redstone_3.png";
    } else if (b.tool == 26) {
      return "../../assets/dirtup_1.png";
    } else if (b.tool == 27) {
      return "../../assets/stoneup_1.png";
    } else if (b.tool == 28) {
      return "../../assets/stone_3.png";
    } else if (b.tool == 29) {
      return "../../assets/stoneAngle_1.png";
    } else if (b.tool == 30) {
      return "../../assets/stoneAngle_2.png";
    } else if (b.tool == 31) {
      return "../../assets/stoneAngle_3.png";
    } else if (b.tool == 32) {
      return "../../assets/stoneAngle_4.png";
    } else {
      return "../../assets/empty_1.png";
    }
    
  }
}
