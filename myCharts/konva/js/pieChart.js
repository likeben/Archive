function PieChart(option) {
    this._init(option);
}

PieChart.prototype = {
    constructor : PieChart,
    _init : function(option) {
        option = option || {};
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.innerR = option.innerR || 0;
        this.outerR = option.outerR || 0;
        this.outerSW = option.outerSW || 0; // 外圆描边宽度
        this.outerS = option.outerS || '#ccc';  // 外圆描边颜色
        this.data = option.data || [];  // 数据
        this.index = 0;     // 动画索引
    },
    // 绘制渲染函数
    render : function(stage){
        // 添加图层
        var layer = new Konva.Layer();

        // 饼图组
        var pieGroup = new Konva.Group({
            x : 0,
            y : 0
        });

        // 图例组
        var textGroup = new Konva.Group({
            x : this.x + this.outerR + 100,
            y : this.y
        });

            // 绘制外环
        var circle = new Konva.Circle({
            x : this.x,
            y : this.y,
            radius : this.outerR,
            stroke : this.outerS,
            strokeWidth : this.outerSW
        });
        pieGroup.add(circle);

        var startAngle = -90;   // 扇形起始角度
        var areaAngle = 0;  // 扇形区域对应的角度
        var textAngle = 0;  // 文字所在的角度
        var fillColor = ''; // 填充颜色
        var ratioText = ''; // 比率文字
        var legendY =0;     // 图例文字纵坐标

        for (var i = 0; i < this.data.length; i++) {
            // 绘制各部分扇形
            areaAngle = this.data[i].value * 360;
            fillColor = this.data[i].color;
            var wedge = new Konva.Wedge({
                x : this.x,
                y : this.y,
                radius : this.innerR,
                rotation : startAngle,
                angle : areaAngle,
                fill : fillColor
            });

            // 绘制各部分对应的比率文字
            ratioText = this.data[i].value * 100 + '%';
            textAngle = (startAngle + areaAngle * 0.5) / 180 * Math.PI;
            var text = new Konva.Text({
                x : this.x + (this.innerR + 60) * Math.cos(textAngle),
                y : this.y + (this.innerR + 60) * Math.sin(textAngle),
                text : ratioText,
                fill : fillColor,
                fontSize : 24
            });
            // 如果文字在纵坐标左边, 向左位移一个文字宽度的距离
            if (startAngle > 90 && startAngle < 270) {
                text.offsetX(text.width())
            }

            // 将图形和文字添加到饼图组
            pieGroup.add(wedge);
            pieGroup.add(text);
            // 更新起始角度
            startAngle = startAngle + areaAngle;

            // 绘制图例矩形
            var rect = new Konva.Rect({
                x : 0,
                y : legendY,
                width : 100,
                height : 30,
                fill : fillColor,
                cornerRadius : 5
            });
            // 绘制图例文字
            var legendText = new Konva.Text({
                x : rect.x() + rect.width() + 8,    // 必须加上矩形的宽度, 否则会被矩形遮盖
                y : legendY + 6,
                text : this.data[i].name,
                fill : fillColor,
                fontSize : 16
            });

            // 将矩形和文字添加到图例组
            textGroup.add(rect);
            textGroup.add(legendText);
            // 增加每行图例纵坐标
            legendY += rect.height() + 5;
        }

        layer.add(pieGroup);
        layer.add(textGroup);
        stage.add(layer);
    },
    // 饼图展开动画函数
    playAnimation : function() {
        var self = this;
        var shapes = stage.find('Wedge');
        // 将所有扇形的角度初始为0
        if (this.index == 0) {
            shapes.each(function(shape) {
                shape.angle(0);
            })
        }

        var shape = shapes[this.index];
        shape.to({
            angle : this.data[this.index].value * 360,  // 每个扇形动画的目标角度
            duration : this.data[this.index].value, // 每个扇形的所占的动画时间, 总时长为1s
            onFinish : function() {
                self.index ++;  
                if (self.index >= self.data.length){    // 判断是否完成整个饼图动画, 如果完成, 结束递归循环
                    self.index = 0;
                    return;
                }
                // 递归; 使每个扇形依次完成动画
                self.playAnimation();
            }
        });

    }
}