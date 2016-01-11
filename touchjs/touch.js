var TouchDirection = function(e) {
    var dateTime,
        startThat = {},
        moveThat = {};

    dateTime = new Date();

    this.touchStartEven = function(e) {

        startThat.startX = e.touches[0].pageX;
        startThat.startY = e.touches[0].pageY;
        this.startThat = startThat;

        return this;
    };

    this.touchMoveEven = function(e) {
        moveX = e.touches[0].pageX;
        moveY = e.touches[0].pageY;

        tempX = this.startThat.startX - moveX;
        tempY = this.startThat.startY - moveY;
        absTempX = Math.abs(tempX);
        absTempY = Math.abs(tempY);
        angleTouch = absTempX / absTempY;

        if (tempX < 0 && angleTouch >= 1) {
            //鼠标右滑动
            moveThat.direction = 'right';
            moveThat.moveX = absTempX;
            this.moveThat = moveThat;

            return this;
        }
        if (tempX > 0 && angleTouch >= 1) {
            //鼠标左滑动
            moveThat.direction = 'left';
            moveThat.moveX = absTempX;
            this.moveThat = moveThat;

            return this;

        }
        if (tempY > 0 && angleTouch < 1) {
            //上滑
            moveThat.direction = 'up';
            moveThat.moveY = absTempY;
            this.moveThat = moveThat;

            return this;
        }

        if (tempY < 0 && angleTouch < 1) {
            //下滑
            moveThat.direction = 'down';
            moveThat.moveY = absTempY;
            this.moveThat = moveThat;

            return this;
        }
    };

    this.touchEndEven = function(){
        this.startThat = null;
        this.moveThat = null;
    };
};
