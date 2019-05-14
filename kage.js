function Kage(size){
  // method
  function makeGlyph(polygons, buhin){ // void
    var glyphData = this.kBuhin.search(buhin);
    this.makeGlyph2(polygons, glyphData);
  }
  Kage.prototype.makeGlyph = makeGlyph;
  
  function makeGlyph2(polygons, data){ // void
    if(data != ""){
      var strokesArray =
        this.adjustRoof(
        this.adjustLeftTop(
        this.adjustDiagonal(
        this.adjustInclusion(
        this.adjustYoko(
        this.adjustDownLeft(
        this.adjustKirikuchi(
        this.adjustUroko2(
        this.adjustUroko(
        this.adjustKakato(
        this.adjustTate(
        this.adjustMage(
        this.adjustHane(
        this.getEachStrokes(
        data))))))))))))));
      for(var i = 0; i < strokesArray.length; i++){
        dfDrawFont(this, polygons,
                   strokesArray[i][0],
                   strokesArray[i][1],
                   strokesArray[i][2],
                   strokesArray[i][3],
                   strokesArray[i][4],
                   strokesArray[i][5],
                   strokesArray[i][6],
                   strokesArray[i][7],
                   strokesArray[i][8],
                   strokesArray[i][9],
                   strokesArray[i][10]);
      }
    }
  }
  Kage.prototype.makeGlyph2 = makeGlyph2;
  
  function makeGlyph3(data){ // void
    var result = new Array();
    if(data != ""){
      var strokesArray =
        this.adjustRoof(
        this.adjustLeftTop(
        this.adjustDiagonal(
        this.adjustInclusion(
        this.adjustYoko(
        this.adjustDownLeft(
        this.adjustKirikuchi(
        this.adjustUroko2(
        this.adjustUroko(
        this.adjustKakato(
        this.adjustTate(
        this.adjustMage(
        this.adjustHane(
        this.getEachStrokes(
        data))))))))))))));
      for(var i = 0; i < strokesArray.length; i++){
        var polygons = new Polygons();
        dfDrawFont(this, polygons,
                   strokesArray[i][0],
                   strokesArray[i][1],
                   strokesArray[i][2],
                   strokesArray[i][3],
                   strokesArray[i][4],
                   strokesArray[i][5],
                   strokesArray[i][6],
                   strokesArray[i][7],
                   strokesArray[i][8],
                   strokesArray[i][9],
                   strokesArray[i][10]);
        result.push(polygons);
      }
    }
    return result;
  }
  Kage.prototype.makeGlyph3 = makeGlyph3;
  
  function getEachStrokes(glyphData){ // strokes array
    var strokesArray = new Array();
    var strokes = glyphData.split("$");
    for(var i = 0; i < strokes.length; i++){
      var columns = strokes[i].split(":");
      if(Math.floor(columns[0]) != 99){
        strokesArray.push([
          Math.floor(columns[0]),
          Math.floor(columns[1]),
          Math.floor(columns[2]),
          Math.floor(columns[3]),
          Math.floor(columns[4]),
          Math.floor(columns[5]),
          Math.floor(columns[6]),
          Math.floor(columns[7]),
          Math.floor(columns[8]),
          Math.floor(columns[9]),
          Math.floor(columns[10])
          ]);
      } else {
        var buhin = this.kBuhin.search(columns[7]);
        if(buhin != ""){
          strokesArray = strokesArray.concat(this.getEachStrokesOfBuhin(buhin,
                                                                        Math.floor(columns[3]),
                                                                        Math.floor(columns[4]),
                                                                        Math.floor(columns[5]),
                                                                        Math.floor(columns[6]),
                                                                        Math.floor(columns[1]),
                                                                        Math.floor(columns[2]),
                                                                        Math.floor(columns[9]),
                                                                        Math.floor(columns[10]))
          );
        }
      }
    }
    return strokesArray;
  }
  Kage.prototype.getEachStrokes = getEachStrokes;
  
  function getEachStrokesOfBuhin(buhin, x1, y1, x2, y2, sx, sy, sx2, sy2){
    var temp = this.getEachStrokes(buhin);
    var result = new Array();
    var box = this.getBox(buhin);
    if(sx != 0 || sy != 0){
      if(sx > 100){
        sx -= 200;
      } else {
        sx2 = 0;
        sy2 = 0;
      }
    }
    for(var i = 0; i < temp.length; i++){
      if(sx != 0 || sy != 0){
        temp[i][3] = stretch(sx, sx2, temp[i][3], box.minX, box.maxX);
        temp[i][4] = stretch(sy, sy2, temp[i][4], box.minY, box.maxY);
        temp[i][5] = stretch(sx, sx2, temp[i][5], box.minX, box.maxX);
        temp[i][6] = stretch(sy, sy2,temp[i][6], box.minY, box.maxY);
        if(temp[i][0] != 99){
          temp[i][7] = stretch(sx, sx2, temp[i][7], box.minX, box.maxX);
          temp[i][8] = stretch(sy, sy2, temp[i][8], box.minY, box.maxY);
          temp[i][9] = stretch(sx, sx2, temp[i][9], box.minX, box.maxX);
          temp[i][10] = stretch(sy, sy2, temp[i][10], box.minY, box.maxY);
        }
      }
      result.push([temp[i][0],
                   temp[i][1],
                   temp[i][2],
                   x1 + temp[i][3] * (x2 - x1) / 200,
                   y1 + temp[i][4] * (y2 - y1) / 200,
                   x1 + temp[i][5] * (x2 - x1) / 200,
                   y1 + temp[i][6] * (y2 - y1) / 200,
                   x1 + temp[i][7] * (x2 - x1) / 200,
                   y1 + temp[i][8] * (y2 - y1) / 200,
                   x1 + temp[i][9] * (x2 - x1) / 200,
                   y1 + temp[i][10] * (y2 - y1) / 200]);
    }
    return result;
  }
  Kage.prototype.getEachStrokesOfBuhin = getEachStrokesOfBuhin;
  
  function adjustHane(sa){ // strokesArray
    for(var i = 0; i < sa.length; i++){
      if((sa[i][0] == 1 || sa[i][0] == 2 || sa[i][0] == 6) && sa[i][2] == 4){
        var lpx; // lastPointX
        var lpy; // lastPointY
        if(sa[i][0] == 1){
          lpx = sa[i][5];
          lpy = sa[i][6];
        } else if(sa[i][0] == 2){
          lpx = sa[i][7];
          lpy = sa[i][8];
        } else {
          lpx = sa[i][9];
          lpy = sa[i][10];
        }
        var mn = Infinity; // mostNear
        if(lpx + 18 < 100){
          mn = lpx + 18;
        }
        for(var j = 0; j < sa.length; j++){
          if(i != j && sa[j][0] == 1 && sa[j][3] == sa[j][5] && sa[j][3] < lpx && sa[j][4] <= lpy && sa[j][6] >= lpy){
            if(lpx - sa[j][3] < 100){
              mn = Math.min(mn, lpx - sa[j][3]);
            }
          }
        }
        if(mn != Infinity){
          sa[i][2] += 700 - Math.floor(mn / 15) * 100; // 0-99 -> 0-700
        }
      }
    }
    return sa;
  }
  Kage.prototype.adjustHane = adjustHane;

  function adjustUroko(strokesArray){ // strokesArray
    for(var i = 0; i < strokesArray.length; i++){
      if(strokesArray[i][0] == 1 && strokesArray[i][2] == 0){ // no operation for TATE
        for(var k = 0; k < this.kAdjustUrokoLengthStep; k++){
          var tx, ty, tlen;
          if(strokesArray[i][4] == strokesArray[i][6]){ // YOKO
            tx = strokesArray[i][5] - this.kAdjustUrokoLine[k];
            ty = strokesArray[i][6] - 0.5;
            tlen = strokesArray[i][5] - strokesArray[i][3];
          } else {
            var rad = Math.atan((strokesArray[i][6] - strokesArray[i][4]) / (strokesArray[i][5] - strokesArray[i][3]));
            tx = strokesArray[i][5] - this.kAdjustUrokoLine[k] * Math.cos(rad) - 0.5 * Math.sin(rad);
            ty = strokesArray[i][6] - this.kAdjustUrokoLine[k] * Math.sin(rad) - 0.5 * Math.cos(rad);
            tlen = Math.sqrt((strokesArray[i][6] - strokesArray[i][4]) * (strokesArray[i][6] - strokesArray[i][4]) +
                             (strokesArray[i][5] - strokesArray[i][3]) * (strokesArray[i][5] - strokesArray[i][3]));
          }
          if(tlen < this.kAdjustUrokoLength[k] ||
             isCrossWithOthers(strokesArray, i, tx, ty, strokesArray[i][5], strokesArray[i][6])
          ){
            strokesArray[i][2] += (this.kAdjustUrokoLengthStep - k) * 100;
            k = Infinity;
          }
        }
      }
    }
    return strokesArray;
  }
  Kage.prototype.adjustUroko = adjustUroko;
  
  function adjustUroko2(strokesArray){ // strokesArray
    for(var i = 0; i < strokesArray.length; i++){
      if(strokesArray[i][0] == 1 && strokesArray[i][2] == 0 && strokesArray[i][4] == strokesArray[i][6]){
        var pressure = 0;
        for(var j = 0; j < strokesArray.length; j++){
          if(i != j && (
             (strokesArray[j][0] == 1 && strokesArray[j][4] == strokesArray[j][6] &&
              !(strokesArray[i][3] + 1 > strokesArray[j][5] || strokesArray[i][5] - 1 < strokesArray[j][3]) &&
              Math.abs(strokesArray[i][4] - strokesArray[j][4]) < this.kAdjustUroko2Length) ||
             (strokesArray[j][0] == 3 && strokesArray[j][6] == strokesArray[j][8] &&
              !(strokesArray[i][3] + 1 > strokesArray[j][7] || strokesArray[i][5] - 1 < strokesArray[j][5]) &&
              Math.abs(strokesArray[i][4] - strokesArray[j][6]) < this.kAdjustUroko2Length)
          ))
          {
            pressure += Math.pow(this.kAdjustUroko2Length - Math.abs(strokesArray[i][4] - strokesArray[j][6]), 1.1);
          }
        }
        var result = Math.min(Math.floor(pressure / this.kAdjustUroko2Length), this.kAdjustUroko2Step) * 100;
        if(strokesArray[i][2] < result){
          strokesArray[i][2] = strokesArray[i][2] % 100 + Math.min(Math.floor(pressure / this.kAdjustUroko2Length), this.kAdjustUroko2Step) * 100;
        }
      }
    }
    return strokesArray;
  }
  Kage.prototype.adjustUroko2 = adjustUroko2;
  
  function adjustTate(strokesArray){ // strokesArray
    for(var i = 0; i < strokesArray.length; i++){
      if((strokesArray[i][0] == 1 || strokesArray[i][0] == 3 || strokesArray[i][0] == 7) && strokesArray[i][3] == strokesArray[i][5]){
        for(var j = 0; j < strokesArray.length; j++){
          if(i != j && (strokesArray[j][0] == 1 || strokesArray[j][0] == 3 || strokesArray[j][0] == 7) && strokesArray[j][3] == strokesArray[j][5] &&
            !(strokesArray[i][4] + 1 > strokesArray[j][6] || strokesArray[i][6] - 1 < strokesArray[j][4]) &&
            Math.abs(strokesArray[i][3] - strokesArray[j][3]) < this.kMinWidthT * this.kAdjustTateStep)
          {
            strokesArray[i][1] += (this.kAdjustTateStep - Math.floor(Math.abs(strokesArray[i][3] - strokesArray[j][3]) / this.kMinWidthT)) * 1000;
            if(strokesArray[i][1] > this.kAdjustTateStep * 1000){
              strokesArray[i][1] = strokesArray[i][1] % 1000 + this.kAdjustTateStep * 1000;
            }
          }
        }
      }
    }
    return strokesArray;
  }
  Kage.prototype.adjustTate = adjustTate;
  
  function adjustMage(strokesArray){ // strokesArray
    for(var i = 0; i < strokesArray.length; i++){
      if((strokesArray[i][0] == 3) && strokesArray[i][6] == strokesArray[i][8]){
        for(var j = 0; j < strokesArray.length; j++){
          if(i != j && (
             (strokesArray[j][0] == 1 && strokesArray[j][4] == strokesArray[j][6] &&
              !(strokesArray[i][5] + 1 > strokesArray[j][5] || strokesArray[i][7] - 1 < strokesArray[j][3]) &&
              Math.abs(strokesArray[i][6] - strokesArray[j][4]) < this.kMinWidthT * this.kAdjustMageStep) ||
             (strokesArray[j][0] == 3 && strokesArray[j][6] == strokesArray[j][8] &&
              !(strokesArray[i][5] + 1 > strokesArray[j][7] || strokesArray[i][7] - 1 < strokesArray[j][5]) &&
              Math.abs(strokesArray[i][6] - strokesArray[j][6]) < this.kMinWidthT * this.kAdjustMageStep)
          ))
          {
            strokesArray[i][2] += (this.kAdjustMageStep - Math.floor(Math.abs(strokesArray[i][6] - strokesArray[j][6]) / this.kMinWidthT)) * 1000;
            if(strokesArray[i][2] > this.kAdjustMageStep * 1000){
              strokesArray[i][2] = strokesArray[i][2] % 1000 + this.kAdjustMageStep * 1000;
            }
          }
        }
      }
    }
    return strokesArray;
  }
  Kage.prototype.adjustMage = adjustMage;
  
  function adjustKirikuchi(strokesArray){ // strokesArray
    for(var i = 0; i < strokesArray.length; i++){
      if(((strokesArray[i][0] == 2) || (strokesArray[i][0] == 1 && this.kShotai == this.kGothic)) &&
         strokesArray[i][1] == 32 &&
         strokesArray[i][3] > strokesArray[i][5] &&
         strokesArray[i][4] < strokesArray[i][6])
      {
        for(var j = 0; j < strokesArray.length; j++){ // no need to skip when i == j
          if(strokesArray[j][0] == 1 &&
             strokesArray[j][3] < strokesArray[i][3] && strokesArray[j][5] > strokesArray[i][3] &&
             strokesArray[j][4] == strokesArray[i][4] && strokesArray[j][4] == strokesArray[j][6])
          {
            strokesArray[i][1] = 132;
            j = strokesArray.length;
          }
        }
      }
      if(strokesArray[i][0] == 1 && this.kShotai == this.kGothic &&
         strokesArray[i][2] == 32 &&
         strokesArray[i][3] > strokesArray[i][5] &&
         strokesArray[i][4] < strokesArray[i][6]){
        for(var j = 0; j < strokesArray.length; j++){ // no need to skip when i == j
          if(strokesArray[j][0] == 1 &&
             strokesArray[j][3] < strokesArray[i][5] && strokesArray[j][5] > strokesArray[i][5] &&
             strokesArray[j][6] == strokesArray[i][6] && strokesArray[j][4] == strokesArray[j][6]){
            strokesArray[i][2] = 82;
            j = strokesArray.length;
          }
        }
      }
    }
    return strokesArray;
  }
  Kage.prototype.adjustKirikuchi = adjustKirikuchi;
  
  function adjustKakato(strokesArray){ // strokesArray
    for(var i = 0; i < strokesArray.length; i++){
      if(strokesArray[i][0] == 1 &&
         (strokesArray[i][2] == 13 || strokesArray[i][2] == 23))
      {
        for(var k = 0; k < this.kAdjustKakatoStep; k++){
          if(isCrossBoxWithOthers(strokesArray, i,
                                  strokesArray[i][5] - this.kAdjustKakatoRangeX / 2,
                                  strokesArray[i][6] + this.kAdjustKakatoRangeY[k],
                                  strokesArray[i][5] + this.kAdjustKakatoRangeX / 2,
                                  strokesArray[i][6] + this.kAdjustKakatoRangeY[k + 1])
             | strokesArray[i][6] + this.kAdjustKakatoRangeY[k + 1] > 200 // adjust for baseline
             | strokesArray[i][6] - strokesArray[i][4] < this.kAdjustKakatoRangeY[k + 1] // for thin box
          )
          {
            strokesArray[i][2] += (3 - k) * 100;
            k = Infinity;
          }
        }
      }
    }
    return strokesArray;
  }
  Kage.prototype.adjustKakato = adjustKakato;
  
  function adjustDownLeft(strokesArray){ // strokesArray
    if (this.kShotai == this.kGothic) {
      var x1, x2, x3, y1, y2, y3;
      var xx1, xx2, yy1, yy2, lines;
      strokeLoop: for(var i = 0; i < strokesArray.length; i++){
        if (((strokesArray[i][0] == 2) || (strokesArray[i][0] == 6) || (strokesArray[i][0] == 7)) && (strokesArray[i][2] == 7)) {
          x1 = strokesArray[i][3]; y1 = strokesArray[i][4];
          x2 = strokesArray[i][5 + (strokesArray[i][0] == 2 ? 0 : 2)];
          y2 = strokesArray[i][6 + (strokesArray[i][0] == 2 ? 0 : 2)];
          x3 = strokesArray[i][7 + (strokesArray[i][0] == 2 ? 0 : 2)];
          y3 = strokesArray[i][8 + (strokesArray[i][0] == 2 ? 0 : 2)];
          if ((x1 > x3) && (y1 < y3)) { // down-left stroke
            for(var k = 0; k < strokesArray.length; k++){ // each target stroke
              if (i == k) {continue;}
              if (Math.hypot(x3 - strokesArray[k][3], y3 - strokesArray[k][4]) <= 4) {
                strokesArray[i][7 + (strokesArray[i][0] == 2 ? 0 : 2)] = strokesArray[k][3] - this.kWidth;
                continue strokeLoop;
              }
              switch (strokesArray[k][0]) {
                case 1:                 lines = 1; break;
                case 2: case 3:         lines = 2; break;
                case 4: case 6: case 7: lines = 3; break;
                default:                lines = 0; break;
              }
              for (var j = 0; j < lines; j++) {
                xx1 = strokesArray[k][3 + j * 2]; yy1 = strokesArray[k][4 + j * 2];
                xx2 = strokesArray[k][5 + j * 2]; yy2 = strokesArray[k][6 + j * 2];
                if (xx1 != xx2) { // horizontal or diagonal target line
                  if ((strokesArray[k][3] < strokesArray[k][3 + lines * 2]) && (strokesArray[k][4] > strokesArray[k][4 + lines * 2]) && (strokesArray[k][2] == 7) && ((strokesArray[k][0] == 2) || (strokesArray[k][0] == 6))) { // up-right stroke
                    var a = (yy2 - yy1) / (xx2 - xx1);
                    var b = yy1 - xx1 * a;
                    if ((x3 >= Math.min(xx1, xx2)) && (x3 <= Math.max(xx1, xx2))) {
                      if ((y3 >= (a * x3 + b - 5)) && (y3 <= (a * x3 + b + 5))) {
                        continue strokeLoop;
                      }
                    }
                  }
                }
              }
            }
            strokesArray[i][7 + (strokesArray[i][0] == 2 ? 0 : 2)] = (x3 * 9 + x2) / 10.;
            strokesArray[i][8 + (strokesArray[i][0] == 2 ? 0 : 2)] = (y3 * 9 + y2) / 10.;
          }
        }
      }
    }
    return strokesArray;
  }
  Kage.prototype.adjustDownLeft = adjustDownLeft;
  
  function adjustYoko(strokesArray){ // strokesArray
    if (this.kShotai == this.kGothic) {
      for(var i = 0; i < strokesArray.length; i++){
        if((strokesArray[i][0] == 1) && strokesArray[i][4] == strokesArray[i][6]){
          for(var j = 0; j < strokesArray.length; j++){
            if(i != j && (strokesArray[j][0] == 1) && strokesArray[j][4] == strokesArray[j][6] &&
              !(strokesArray[i][3] + 1 > strokesArray[j][5] || strokesArray[i][5] - 1 < strokesArray[j][3]) &&
              Math.abs(strokesArray[i][4] - strokesArray[j][4]) < this.kWidth * this.kAdjustTateStep * 1.25){
              strokesArray[i][1] += (this.kAdjustTateStep - Math.floor(Math.abs(strokesArray[i][4] - strokesArray[j][4]) / this.kWidth / 1.25)) * 1000;
              if(strokesArray[i][1] > Math.floor(this.kAdjustTateStep * 1.5) * 1000){
                strokesArray[i][1] = strokesArray[i][1] % 1000 + Math.floor(this.kAdjustTateStep * 1.5) * 1000;
              }
            }
          }
        }
      }
    }
    return strokesArray;
  }
  Kage.prototype.adjustYoko = adjustYoko;
  
  function adjustInclusion(strokesArray){ // strokesArray
    var boxes = new Array();
    for(var i = 0; i < strokesArray.length; i++){
      var si = strokesArray[i];
      /* Vertical lines */
      if(((si[0] == 1) || (si[0] == 3)) && (si[3] == si[5])){
        for(var j = i + 1; j < strokesArray.length; j++){
          var sj = strokesArray[j];
          if(((sj[0] == 1) || (sj[0] == 3)) && (sj[3] == sj[5])){
            if (Math.abs(si[3] - sj[3]) <= 100) {
              var tmpArray = [
                Math.min(si[3], sj[3]),
                Math.max(si[4], sj[4]),
                Math.max(si[5], sj[5]),
                Math.min(si[6], sj[6])];
              if ((tmpArray[0] < tmpArray[2]) && (tmpArray[1] < tmpArray[3])) {
                boxes.push([
                  Math.min(si[3], sj[3]),
                  Math.min(si[4], sj[4]),
                  Math.max(si[5], sj[5]),
                  Math.max(si[6], sj[6]), 100]);
              }
            }
          }
        }
      }
      /* Horizontal lines */
      if(((si[0] == 1) && (si[4] == si[6])) || ((si[0] == 3) && (si[6] == si[8]))){
        for(var j = i + 1; j < strokesArray.length; j++){
          var sj = strokesArray[j];
          if(((sj[0] == 1) && (sj[4] == sj[6])) || ((sj[0] == 3) && (sj[6] == sj[8]))){
            if (Math.abs(si[4] - sj[4]) <= 40) {
              var tmpArray = [
                Math.max(si[si[0]==3?5:3], sj[sj[0]==3?5:3]),
                Math.min(si[si[0]==3?6:4], sj[sj[0]==3?6:4]),
                Math.min(si[si[0]==3?7:5], sj[sj[0]==3?7:5]),
                Math.max(si[si[0]==3?8:6], sj[sj[0]==3?8:6])];
              if ((tmpArray[0] < tmpArray[2]) && (tmpArray[1] < tmpArray[3])) {
                boxes.push([
                  Math.min(si[si[0]==3?5:3], sj[sj[0]==3?5:3]),
                  Math.min(si[si[0]==3?6:4], sj[sj[0]==3?6:4]),
                  Math.max(si[si[0]==3?7:5], sj[sj[0]==3?7:5]),
                  Math.max(si[si[0]==3?8:6], sj[sj[0]==3?8:6]), 40]);
              }
            }
          }
        }
      }
    }
    for(var i = 0; i < strokesArray.length; i++){
      if((strokesArray[i][0] == 2) || (strokesArray[i][0] == 3) || ((strokesArray[i][0] == 1) && (strokesArray[i][3] != strokesArray[i][5]) && (strokesArray[i][4] != strokesArray[i][6]))) {
        for(var j = 0; j < boxes.length; j++){
          if((strokesArray[i][3] > boxes[j][0]) && (strokesArray[i][4] > boxes[j][1]) && (strokesArray[i][3] < boxes[j][2]) && (strokesArray[i][4] < boxes[j][3])) {
            if((strokesArray[i][5] > boxes[j][0]) && (strokesArray[i][6] > boxes[j][1]) && (strokesArray[i][5] < boxes[j][2]) && (strokesArray[i][6] < boxes[j][3])) {
              if((strokesArray[i][0] == 1) || ((strokesArray[i][7] > boxes[j][0]) && (strokesArray[i][8] > boxes[j][1]) && (strokesArray[i][7] < boxes[j][2]) && (strokesArray[i][8] < boxes[j][3]))) {
                strokesArray[i][1] = Math.max(strokesArray[i][1], strokesArray[i][1] % 1000 + (this.kAdjustTateStep - Math.floor((Math.min(boxes[j][3] - boxes[j][1], boxes[j][2] - boxes[j][0]) - (boxes[j][4] / 4)) / boxes[j][4] * this.kAdjustTateStep)) * 1000);
                if(strokesArray[i][1] > this.kAdjustTateStep * 1000){
                  strokesArray[i][1] = strokesArray[i][1] % 1000 + this.kAdjustTateStep * 1000;
                }
              }
            }
          }
        }
      }
    }
    return strokesArray;
  }
  Kage.prototype.adjustInclusion = adjustInclusion;
  
  function adjustDiagonal(strokesArray){ // strokesArray
    var xx11, xx12, xx13, yy11, yy12, yy13;
    var xx21, xx22, xx23, yy21, yy22, yy23;
    for(var i = 0; i < strokesArray.length; i++){
      if((strokesArray[i][0] >= 1)||(strokesArray[i][0] <= 3)) {
        switch (strokesArray[i][0]) {
          case 2:
            xx11 = strokesArray[i][3]; yy11 = strokesArray[i][4];
            xx12 = strokesArray[i][5]; yy12 = strokesArray[i][6];
            xx13 = strokesArray[i][7]; yy13 = strokesArray[i][8];
            break;
          case 1: case 3:
            xx11 = strokesArray[i][3]; yy11 = strokesArray[i][4];
            xx13 = strokesArray[i][5]; yy13 = strokesArray[i][6];
            xx12 = Math.floor((xx13 + xx11) / 2);
            yy12 = Math.floor((yy13 + yy11) / 2);
            break;
        }
        for(var j = 0; j < strokesArray.length; j++){
          if (i == j) {continue;}
          if((strokesArray[j][0] >= 1)||(strokesArray[j][0] <= 3)) {
            switch (strokesArray[j][0]) {
              case 2:
                xx21 = strokesArray[j][3]; yy21 = strokesArray[j][4];
                xx22 = strokesArray[j][5]; yy22 = strokesArray[j][6];
                xx23 = strokesArray[j][7]; yy23 = strokesArray[j][8];
                break;
              case 1: case 3:
                xx21 = strokesArray[j][3]; yy21 = strokesArray[j][4];
                xx23 = strokesArray[j][5]; yy23 = strokesArray[j][6];
                xx22 = Math.floor((xx23 + xx21) / 2);
                yy22 = Math.floor((yy23 + yy21) / 2);
                break;
            }
            if(Math.abs(Math.sin(Math.atan2(yy23 - yy21, xx23 - xx21) - Math.atan2(yy13 - yy11, xx13 - xx11))) < 0.3) {
              strokesArray[i][1] = Math.max(
                strokesArray[i][1], strokesArray[i][1] % 1000 + (
                  this.kAdjustTateStep - Math.min(
                    this.kAdjustTateStep,
                    Math.floor(Math.min(
                      Math.hypot(xx21 - xx11, yy21 - yy11),
                      Math.hypot(xx22 - xx12, yy22 - yy12),
                      Math.hypot(xx23 - xx13, yy23 - yy13)
                    ) / this.kMinWidthT),
                    (strokesArray[i][0] == 1 && xx11 == xx13) // vertical
                      ? Math.floor(Math.min(
                        Math.abs(xx21 - xx11),
                        Math.abs(xx22 - xx11),
                        Math.abs(xx23 - xx11)
                      ) / this.kMinWidthT) : Infinity
                  )
                ) * 1000
              );
              if(strokesArray[i][1] > this.kAdjustTateStep * 1000){
                strokesArray[i][1] = strokesArray[i][1] % 1000 + this.kAdjustTateStep * 1000;
              }
            }
          }
        }
      }
    }
    return strokesArray;
  }
  Kage.prototype.adjustDiagonal = adjustDiagonal;
  
  function adjustLeftTop(strokesArray){ // strokesArray
    if (this.kShotai == this.kSocho) {
      var R2LDlines = new Array();
      for(var i = 0; i < strokesArray.length; i++){
        if ((strokesArray[i][0] == 2) && (strokesArray[i][2] % 100 == 7)) {
          R2LDlines.push(
            [strokesArray[i][3], strokesArray[i][4], strokesArray[i][5], strokesArray[i][6]],
            [strokesArray[i][5], strokesArray[i][6], strokesArray[i][7] + this.kMinWidthT / 2, strokesArray[i][8]]);
        }
      }
      for(var i = 0; i < strokesArray.length; i++){
        if ((strokesArray[i][0] == 1) && (strokesArray[i][3] == strokesArray[i][5])) {
          for (var R2LDindex = 0; R2LDindex < R2LDlines.length; R2LDindex++) {
            var xx0 = strokesArray[i][3];
            var yy0 = strokesArray[i][4];
            var xx1 = R2LDlines[R2LDindex][0];
            var yy1 = R2LDlines[R2LDindex][1];
            var xx2 = R2LDlines[R2LDindex][2];
            var yy2 = R2LDlines[R2LDindex][3];
            if ((xx2 <= xx0) && (xx0 <= xx1) && (xx1 != xx2)) {
              var slope = (yy2 - yy1) / (xx2 - xx1);
              var yIntercept = yy1 - slope * xx1;
              if ((yy0 < (xx0 * slope + yIntercept + this.kMinWidthY * 4)) && (yy0 > (xx0 * slope + yIntercept - this.kMinWidthY * 2))) {
                strokesArray[i][1] += 100000; break;
              }
            }
          }
        }
      }
    }
    return strokesArray;
  }
  Kage.prototype.adjustLeftTop = adjustLeftTop;

  function adjustRoof(strokesArray){ // strokesArray
    if (this.kShotai == this.kSocho) {
      var horizLines = new Array();
      for(var i = 0; i < strokesArray.length; i++){
        if ((strokesArray[i][0] == 1) && (strokesArray[i][4] == strokesArray[i][6])) {
          horizLines.push(
            [strokesArray[i][3], strokesArray[i][4], strokesArray[i][5], strokesArray[i][6]]);
        }
      }
      for(var i = 0; i < strokesArray.length; i++){
        if ((strokesArray[i][0] == 2) && (strokesArray[i][1] == 0) && (strokesArray[i][2] == 7)) {
          for (var lineIndex = 0; lineIndex < horizLines.length; lineIndex++) {
            var xx0 = strokesArray[i][3];
            var yy0 = strokesArray[i][4];
            var xx1 = horizLines[lineIndex][0];
            var yy1 = horizLines[lineIndex][1];
            var xx2 = horizLines[lineIndex][2];
            var yy2 = horizLines[lineIndex][3];
            if ((xx1 <= xx0) && (xx0 <= xx2)) {
              if ((yy0 < (yy1 + this.kMinWidthY * 4)) && (yy0 > (yy1 - this.kMinWidthY * 2))) {
                strokesArray[i][1] += 1000000; break;
              }
            }
          }
        }
      }
    }
    return strokesArray;
  }
  Kage.prototype.adjustRoof = adjustRoof;


  function getBox(glyph){ // minX, minY, maxX, maxY
    var a = new Object();
    a.minX = 200;
    a.minY = 200;
    a.maxX = 0;
    a.maxY = 0;
    
    var strokes = this.getEachStrokes(glyph);
    for(var i = 0; i < strokes.length; i++){
      if(strokes[i][0] == 0){ continue; }
      a.minX = Math.min(a.minX, strokes[i][3]);
      a.maxX = Math.max(a.maxX, strokes[i][3]);
      a.minY = Math.min(a.minY, strokes[i][4]);
      a.maxY = Math.max(a.maxY, strokes[i][4]);
      a.minX = Math.min(a.minX, strokes[i][5]);
      a.maxX = Math.max(a.maxX, strokes[i][5]);
      a.minY = Math.min(a.minY, strokes[i][6]);
      a.maxY = Math.max(a.maxY, strokes[i][6]);
      if(strokes[i][0] == 1){ continue; }
      if(strokes[i][0] == 99){ continue; }
      a.minX = Math.min(a.minX, strokes[i][7]);
      a.maxX = Math.max(a.maxX, strokes[i][7]);
      a.minY = Math.min(a.minY, strokes[i][8]);
      a.maxY = Math.max(a.maxY, strokes[i][8]);
      if(strokes[i][0] == 2){ continue; }
      if(strokes[i][0] == 3){ continue; }
      if(strokes[i][0] == 4){ continue; }
      a.minX = Math.min(a.minX, strokes[i][9]);
      a.maxX = Math.max(a.maxX, strokes[i][9]);
      a.minY = Math.min(a.minY, strokes[i][10]);
      a.maxY = Math.max(a.maxY, strokes[i][10]);
    }
    return a;
  }
  Kage.prototype.getBox = getBox;

  function stretch(dp, sp, p, min, max){ // interger
    var p1, p2, p3, p4;
    if(p < sp + 100){
      p1 = min;
      p3 = min;
      p2 = sp + 100;
      p4 = dp + 100;
    } else {
      p1 = sp + 100;
      p3 = dp + 100;
      p2 = max;
      p4 = max;
    }
    return Math.floor(((p - p1) / (p2 - p1)) * (p4 - p3) + p3);
  }
  Kage.prototype.stretch = stretch;

  //properties
  Kage.prototype.kMincho = 0;
  Kage.prototype.kGothic = 1;
  Kage.prototype.kSocho = 2;
  this.kShotai = this.kMincho;
  
  this.kRate = 100;
  
  if(size == 1){
    this.kMinWidthY = 1.2;
    this.kMinWidthT = 3.6;
    this.kWidth = 3;
    this.kKakato = 1.8;
    this.kL2RDfatten = 1.1;
    this.kMage = 6;
    this.kUseCurve = 0;
    
    this.kAdjustKakatoL = ([8, 5, 3, 1, 0]); // for KAKATO adjustment 000,100,200,300,400
    this.kAdjustKakatoR = ([4, 3, 2, 1]); // for KAKATO adjustment 000,100,200,300
    this.kAdjustKakatoRangeX = 12; // check area width
    this.kAdjustKakatoRangeY = ([1, 11, 14, 18]); // 3 steps of checking
    this.kAdjustKakatoStep = 3; // number of steps
    
    this.kAdjustUrokoX = ([14, 12, 9, 7]); // for UROKO adjustment 000,100,200,300
    this.kAdjustUrokoY = ([7, 6, 5, 4]); // for UROKO adjustment 000,100,200,300
    this.kAdjustUrokoLength = ([13, 21, 30]); // length for checking
    this.kAdjustUrokoLengthStep = 3; // number of steps
    this.kAdjustUrokoLine = ([13, 15, 18]); // check for crossing. corresponds to length
  } else {
    this.kMinWidthY = 2;
    this.kMinWidthT = 6;
    this.kWidth = 5;
    this.kKakato = 3;
    this.kL2RDfatten = 1.1;
    this.kMage = 10;
    this.kUseCurve = 0;
    
    this.kAdjustKakatoL = ([14, 9, 5, 2, 0]); // for KAKATO adjustment 000,100,200,300,400
    this.kAdjustKakatoR = ([8, 6, 4, 2]); // for KAKATO adjustment 000,100,200,300
    this.kAdjustKakatoRangeX = 20; // check area width
    this.kAdjustKakatoRangeY = ([1, 19, 24, 30]); // 3 steps of checking
    this.kAdjustKakatoStep = 3; // number of steps
    
    this.kAdjustUrokoX = ([24, 20, 16, 12]); // for UROKO adjustment 000,100,200,300
    this.kAdjustUrokoY = ([12, 11, 9, 8]); // for UROKO adjustment 000,100,200,300
    this.kAdjustUrokoLength = ([22, 36, 50]); // length for checking
    this.kAdjustUrokoLengthStep = 3; // number of steps
    this.kAdjustUrokoLine = ([22, 26, 30]); // check for crossing. corresponds to length
    
    this.kAdjustUroko2Step = 3;
    this.kAdjustUroko2Length = 40;
    
    this.kAdjustTateStep = 4;
    
    this.kAdjustMageStep = 5;
  }
  
  this.kBuhin = new Buhin();
  
  return this;
}

