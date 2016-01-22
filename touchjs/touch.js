/**
 * [TouchDirection description]
 * @param {[type]} e [description]
 */
var TouchDirection = function(e) {
    this.getStartPosi= function(e) {
        this.startPosi= {
            "startX": e.touches[0].pageX,
            "startY": e.touches[0].pageY
        };

    };
    this.getMovePosi= function(e) {
        this.currentPosi= {
            "currentX": e.touches[0].pageX,
            "currentY": e.touches[0].pageY
        };
        this.movePosi= {
            "moveX": this.startPosi.startX - this.currentPosi.currentX,
            "moveY": this.startPosi.startY - this.currentPosi.currentY
        };
        this.angleTouch= parseInt(Math.abs(this.movePosi.moveX / this.movePosi.moveY));
    };

    // var eventType = e.type;
    // var eventType;
    // switch (eventType) {
    //     case 'touchstart':
    //         this.startPosi = {
    //             "startX": e.touches[0].pageX,
    //             "startY": e.touches[0].pageY
    //         };
    //         break;
    //     case 'touchmove':
    //         this.currentPosi = {
    //             "currentX": e.touches[0].pageX,
    //             "currentY": e.touches[0].pageY
    //         };

    //         this.movePosi = {
    //             "moveX": this.startPosi.startX - this.currentPosi.currentX,
    //             "moveY": this.startPosi.startY - this.currentPosi.currentY
    //         };

    //         this.angleTouch = Math.abs(this.movePosi.moveX / this.movePosi.moveY);

    //         break;
    //     case 'touchend':
    //         this.endPosi = {
    //             "endX": e.touches[0].pageX,
    //             "endY": e.touches[0].pageY
    //         };
    //         break;
    // }

    // return this;

    // var dateTime,
    //     startThat = {},
    //     moveThat = {},
    //     prevNext = {},
    //     endThat = {};
    // var moveX, moveY, direForX, direForY, tempX, tempY, absTempX, absTempY, angleTouch;

    // dateTime = new Date();

    // this.touchStartEven = function(e) {

    //     startThat.startX = e.touches[0].pageX;
    //     startThat.startY = e.touches[0].pageY;
    //     this.startThat = startThat;

    //     //初始化移动的初始坐标
    //     prevNext.moveX = e.touches[0].pageX;
    //     prevNext.moveY = e.touches[0].pageY;
    //     this.prevNext = prevNext;
    //     return this;
    // };

    // this.touchMoveEven = function(e) {
    //     moveX = e.touches[0].pageX;
    //     moveY = e.touches[0].pageY;

    //     direForX = this.prevNext.moveX - moveX;
    //     direForY = this.prevNext.moveY - moveY;

    //     //记录上次移动的坐标
    //     prevNext.moveX = moveX;
    //     prevNext.moveY = moveY;
    //     this.prevNext = prevNext;

    //     tempX = this.startThat.startX - moveX;
    //     tempY = this.startThat.startY - moveY;

    //     absTempX = Math.abs(tempX);
    //     absTempY = Math.abs(tempY);
    //     angleTouch = absTempX / absTempY;

    //     //relativeDirc  相对初始左边    currDirc  当前移动方向
    //     if (tempX < 0 && angleTouch >= 1) {
    //         //相对起点鼠标右滑动
    //         moveThat.relativeDirc = 'right';
    //         if (direForX < 0) {
    //             moveThat.currDirc = 'right';
    //         } else {
    //             moveThat.currDirc = 'left';
    //         }
    //         moveThat.moveX = absTempX;
    //         this.moveThat = moveThat;

    //         return this;
    //     }
    //     if (tempX > 0 && angleTouch >= 1) {
    //         //相对起点鼠标左滑动
    //         moveThat.relativeDirc = 'left';
    //         if (direForX < 0) {
    //             moveThat.currDirc = 'right';
    //         } else {
    //             moveThat.currDirc = 'left';
    //         }
    //         moveThat.moveX = absTempX;
    //         this.moveThat = moveThat;

    //         return this;

    //     }
    //     if (tempY > 0 && angleTouch < 1) {
    //         //相对起点鼠标上滑
    //         moveThat.relativeDirc = 'up';
    //         if (direForY > 0) {
    //             moveThat.currDirc = 'up';
    //         } else {
    //             moveThat.currDirc = 'down';
    //         }
    //         moveThat.moveY = absTempY;
    //         this.moveThat = moveThat;

    //         return this;
    //     }

    //     if (tempY < 0 && angleTouch < 1) {
    //         //相对起点鼠标下滑
    //         moveThat.relativeDirc = 'down';
    //         if (direForY > 0) {
    //             moveThat.currDirc = 'up';
    //         } else {
    //             moveThat.currDirc = 'down';
    //         }
    //         moveThat.moveY = absTempY;
    //         this.moveThat = moveThat;

    //         return this;
    //     }
    // };

    // this.touchEndEven = function(e) {
    //     var endX, endY, direction, tempX, tempY;

    //     //事件结束的位移和方向即为最后的 moveThat
    //     this.endThat = this.moveThat;

    //     return this;
    // };
};
