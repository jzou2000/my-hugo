---
title: Tracing
---

## Speed
四轮车，两前轮为无动力万向轮，两后轮独立旋转驱动。因动力轮可以双向旋转，所以也可以认为前轮驱动。
两动力轮圆心方向定义为轴向，其垂直方向为行动/前进方向。
当动力轮速度相同时，车以前进方向直线运动，速度与两轮速度一致。
当两轮速度不同时，车以轴向为半径方向旋转，圆心朝向低速轮。
请判断正确与否。

假设沿轴向两轮中间有一相同半径的轮（虚拟车轮），则此轮的转弯半径为车转弯半径，相对地面速度为车速，相对地面转弯角速度为转弯角速度，旋转线速度为车速， 车轮转速为车转速。

已知参数：
轮半径 - R
两轮间距/车宽 - W
两轮转速分别为 - r1, r2

请计算并显示演算推导过程：
两轮的转弯半径和转弯速度，
车（即虚拟车轮）的转弯半径，转弯角速度，车速和车转速。

reasoning
  wheel radius R, cart width W
  left turn, inner wheel is left, rotation wl, speed wl * 2R
  right wheel rotation wr, speed wr * 2R

  turn radius: left wheel r, right wheel 2(r+W)
  angular velocity w,
  left wheel linear velocity r * w = wl * 2R
        w = wl * 2R / r
  right wheel linear velocity (r + W) * w = wr * 2R
        w = wr * 2R / (r + W)

  turn radius left turn
        wl * 2R / r = wr * 2R / (r + W)
        (r + W) / r = wr / wl
        1 + W/r = wr/wl
        W/r = wr/wl - 1
        r = W / (wr/wl - 1)
  turn angular velocity
        w = wl * 2R / r
          =  wl * 2R * (wr/wl - 1) / W

## tracing

有两种跟踪模式，小车在人后面，保持与人的距离并跟随人转向，称为跟随模式；
第二种小车在人前面，同样保持与人距离，并自动调整与人的前进方向一致，称作引导模式。

两种模式中保持距离比较容易实现，检测并保持方向一致可能跟随模式比引导模式简单些。

撇开具体的实现设备和细节，假设相关传感器或模块检测出目标（即人）的距离和方向，请从概念上解释如何实现两种模式的跟踪。

解释可以使用语言并混合图形或伪代码。

## ultrasonic sensor

一种实现选项是使用超声波传感器（例如HC-SR04）检测距离，使用伺服电机（例如SG90）控制超声波方向，从而实现类似雷达的工作方式，检测方位。

常见HC-SR04实现例子使用同步模式（即触发后以阻塞方式等待回波），如果希望每秒扫描一次（前进方向-45度至+45度范围），不知是否能够做到，也许可以使用异步方式。

打算用于实现一个小型的原型系统。

## ToF Array

使用ToF Array（例如VL53L5CX），可以检测8*8矩阵的距离，因此可以省略任何机械运动部件。不清楚其工作原理和实现细节，可以解释吗？

